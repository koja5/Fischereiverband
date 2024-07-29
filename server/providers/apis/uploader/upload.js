require("dotenv").config();
const express = require("express");
const router = express.Router();
const logger = require("../../config/logger");
const auth = require("../../config/authentification/auth");
const sql = require("../../config/sql-database");
const uploadMiddleware = require("./uploadMiddleware");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({
  uploadDir: "../client/src/assets/file-storage",
});

module.exports = router;

var connection = sql.connect();

connection.getConnection(function (err, conn) {});

router.post("/upload", multipartMiddleware, auth, function (req, res) {
  console.log(req.files);
  console.log(req.body);

  req.body.documentation = packDocumentsPath(req.files.documentation);

  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    if (req.body.date_time) {
      req.body.date_time = new Date(req.body.date_time);
    }

    req.body.id_owner = req.user.user.id;

    delete req.body.undefined;

    conn.query(
      "INSERT INTO observation_sheet set ? ON DUPLICATE KEY UPDATE ?",
      [req.body, req.body],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(true);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

function packDocumentsPath(documentation) {
  let docs = documentation;
  let documents = "";
  if (docs.length) {
    for (let i = 0; i < docs.length; i++) {
      documents += getFileName(docs[i].path);
      if (i < docs.length - 1) {
        documents += ";";
      }
    }
  } else {
    documents += getFileName(docs.path) + ";";
  }

  return documents;
}

function getFileName(path) {
  return path.split("\\file-storage").length
    ? path.split("file-storage\\")[1]
    : null;
}
