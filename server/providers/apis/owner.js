require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const expiresToken = "24h";
const logger = require("../config/logger");
const request = require("request");
const fs = require("fs");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
const auth = require("../config/authentification/auth");
const sql = require("../config/sql-database");
const makeRequest = require("./help-function/makeRequest");

module.exports = router;

var connection = sql.connect();

connection.getConnection(function (err, conn) {});

//#region ALL REPORT OCCUPATION

router.get("/getAllFishStocking", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select fs.*, w.name as 'water', f.name as 'fish', af.name as 'age_of_fish', o.name as 'origin' from fish_stocking_details fs join waters w on fs.id_water = w.id_water join fishes f on fs.id_fish = f.id join age_of_fishes af on fs.id_age_of_fish = af.id join origins o on fs.id_origin = o.id where fs.id_owner = ? and fs.fbz like ? and fs.year = ?",
          [req.user.user.id, req.query.fbz, req.query.year],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/setFishStocking", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }

    req.body.id_owner = req.user.user.id;

    conn.query(
      "INSERT INTO fish_stocking_details set ? ON DUPLICATE KEY UPDATE ?",
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

router.post("/deleteFishStocking", auth, function (req, res) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "delete from fish_stocking_details where id = ?",
      [req.body.id],
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

//#endregion ALL REPORT OCCUPATION

//#region OBSERVATION SHEET

router.get("/getAllObservationSheet", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select os.*, w.name as name_of_water from observation_sheet os join waters w on os.id_water = w.id_water where id_owner = ?",
          [req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/setObservationSheet", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    if (req.body.date_time) {
      req.body.date_time = new Date(req.body.date_time);
    }

    req.body.id_owner = req.user.user.id;

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

router.post("/deleteObservationSheet", auth, function (req, res) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "delete from observation_sheet where id = ?",
      [req.body.id],
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

//#endregion

//#region FBZ REGISTER

router.get("/getFbzRegister", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from management_registers where id_owner = ? or id_deputy = ?",
          [req.user.user.id, req.user.user.id],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region FISH STOCKING REPORT

router.get("/getFishStockingReport", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from fish_stocking_reports where id_owner = ? and fbz = ?",
          [req.user.user.id, req.query.fbz],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.post("/completeFishStockingReport", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.id_owner = req.user.user.id;
    req.body.fbz = splitFBZ(req.body.fbz);

    conn.query(
      "select * from fish_stocking_reports where fbz = ? and year = ?",
      [splitFBZ(req.body.fbz), req.body.year],
      function (err, rows) {
        if (!err) {
          if (rows.length) {
            conn.query(
              "UPDATE fish_stocking_reports set ? where id = ?",
              [req.body, rows[0].id],
              function (err, rows) {
                conn.release();
                if (!err) {
                  req.body["firstname"] = req.user.user.firstname;
                  req.body["lastname"] = req.user.user.lastname;
                  makeRequest(
                    req.body,
                    "mail/sendNotificationToAdminForCompletedFishStockingReport",
                    res
                  );
                } else {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(false);
                }
              }
            );
          } else {
            conn.query(
              "INSERT INTO fish_stocking_reports set ?",
              [req.body],
              function (err, rows) {
                conn.release();
                if (!err) {
                  req.body["firstname"] = req.user.user.firstname;
                  req.body["lastname"] = req.user.user.lastname;
                  makeRequest(
                    req.body,
                    "mail/sendNotificationToAdminForCompletedFishStockingReport",
                    res
                  );
                } else {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(false);
                }
              }
            );
          }
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

router.post("/deleteFishStockingReport", auth, function (req, res) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "delete from fish_stocking_reports where id = ?",
      [req.body.id],
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

router.post(
  "/requestToAdminForAdditionalFishStockingReportChanges",
  auth,
  function (req, res) {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      req.body["firstname"] = req.user.user.firstname;
      req.body["lastname"] = req.user.user.lastname;
      makeRequest(
        req.body,
        "mail/sendRequestToAdminForAdditionalFishStockingReportChanges",
        res
      );
    });
  }
);

//#endregion ALL REPORT OCCUPATION

//#region GET WATER FOR SPECIFIC FBZ

router.get("/getWatersForSpecificFBZ", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from waters where fbz = ? and (year is NULL or year = ?)",
          [splitFBZ(req.query.fbz), req.query.year],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getWatersForAll", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from waters where year is NULL",
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region NEW WATER ENTRIES
router.post("/createNewWaterNameEntry", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.fbz = splitFBZ(req.body.fbz);

    conn.query("INSERT INTO waters set ?", [req.body], function (err, rows) {
      conn.release();
      if (!err) {
        res.json(rows.insertId);
      } else {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(false);
      }
    });
  });
});

//#endregion

//#region NEW FISH ENTRIES
router.post("/createNewFishNameEntry", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.fbz = splitFBZ(req.body.fbz);

    conn.query(
      "INSERT INTO fishes_custom set ?",
      [req.body],
      function (err, rows) {
        conn.release();
        if (!err) {
          res.json(req.body.name);
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

//#endregion

//#region NEW ORIGIN ENTRIES
router.post("/createNewOriginNameEntry", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    delete req.body.fbz;

    conn.query("INSERT INTO origins set ?", [req.body], function (err, rows) {
      conn.release();
      if (!err) {
        res.json(rows.insertId);
      } else {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(false);
      }
    });
  });
});

//#endregion

//#region FISH STOCKING

router.get("/getAllFishes", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select f.name from fishes f union select fc.name from fishes_custom fc where (fc.fbz is NULL or fc.fbz = ?) and (fc.year is NULL or fc.year = ?)",
          [
            splitFBZ(req.query.fbz ? req.query.fbz : null),
            req.query.year ? req.query.year : null,
          ],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get("/getAllOrigins", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from origins where (fbz is NULL or fbz = ?) and (year is NULL or year = ?)",
          [splitFBZ(req.query.fbz), req.query.year],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

//#endregion

//#region FISH CATCH
router.get(
  "/getFishCatchDetailsForSelectedWater",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          if (
            req.query.id_water != "undefined" &&
            req.query.id_water != "null"
          ) {
            conn.query(
              "select fcd.* from fish_catch_details fcd where fcd.fbz = ? and fcd.id_water = ?",
              [splitFBZ(req.query.fbz), req.query.id_water],
              function (err, rows, fields) {
                conn.release();
                if (err) {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(err);
                } else {
                  res.json(rows);
                }
              }
            );
          } else {
            conn.query(
              "select fcd.* from fish_catch_details fcd where fcd.fbz = ?",
              [splitFBZ(req.query.fbz)],
              function (err, rows, fields) {
                conn.release();
                if (err) {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(err);
                } else {
                  res.json(rows);
                }
              }
            );
          }
        }
      });
    } catch (ex) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(ex);
    }
  }
);

router.post("/deleteFishCatch", auth, function (req, res) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    conn.query(
      "delete from fish_catch_details where id = ?",
      [req.body.id],
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

router.post("/setFishCatch", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.id_owner = req.user.user.id;
    req.body.fbz = splitFBZ(req.body.fbz);

    conn.query(
      "INSERT INTO fish_catch_details set ? ON DUPLICATE KEY UPDATE ?",
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

router.get("/getFishCatchReport", auth, async (req, res, next) => {
  try {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      } else {
        conn.query(
          "select * from fish_catch_reports where id_owner = ? and fbz = ?",
          [req.user.user.id, req.query.fbz],
          function (err, rows, fields) {
            conn.release();
            if (err) {
              logger.log("error", err.sql + ". " + err.sqlMessage);
              res.json(err);
            } else {
              res.json(rows);
            }
          }
        );
      }
    });
  } catch (ex) {
    logger.log("error", err.sql + ". " + err.sqlMessage);
    res.json(ex);
  }
});

router.get(
  "/getFishCatchDetailsForManagementRegister",
  auth,
  async (req, res, next) => {
    try {
      connection.getConnection(function (err, conn) {
        if (err) {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(err);
        } else {
          conn.query(
            "select fcd.* from fish_catch_details fcd where fcd.fbz = ?",
            [splitFBZ(req.query.fbz)],
            function (err, rows, fields) {
              conn.release();
              if (err) {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(err);
              } else {
                res.json(rows);
              }
            }
          );
        }
      });
    } catch (ex) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(ex);
    }
  }
);

router.post("/completeFishCatchReport", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.id_owner = req.user.user.id;
    req.body.fbz = splitFBZ(req.body.fbz);

    conn.query(
      "select * from fish_catch_reports where fbz = ? and year = ?",
      [splitFBZ(req.body.fbz), req.body.year],
      function (err, rows) {
        if (!err) {
          if (rows.length) {
            conn.query(
              "UPDATE fish_catch_reports set ? where id = ?",
              [req.body, rows[0].id],
              function (err, rows) {
                conn.release();
                if (!err) {
                  req.body["firstname"] = req.user.user.firstname;
                  req.body["lastname"] = req.user.user.lastname;
                  makeRequest(
                    req.body,
                    "mail/sendNotificationToAdminForCompletedFishCatchReport",
                    res
                  );
                } else {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(false);
                }
              }
            );
          } else {
            conn.query(
              "INSERT INTO fish_catch_reports set ?",
              [req.body],
              function (err, rows) {
                conn.release();
                if (!err) {
                  req.body["firstname"] = req.user.user.firstname;
                  req.body["lastname"] = req.user.user.lastname;
                  makeRequest(
                    req.body,
                    "mail/sendNotificationToAdminForCompletedFishCatchReport",
                    res
                  );
                } else {
                  logger.log("error", err.sql + ". " + err.sqlMessage);
                  res.json(false);
                }
              }
            );
          }
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

router.post("/noHaveFishCatchEntry", auth, function (req, res, next) {
  connection.getConnection(function (err, conn) {
    if (err) {
      logger.log("error", err.sql + ". " + err.sqlMessage);
      res.json(err);
    }

    req.body.id_owner = req.user.user.id;

    conn.query(
      "delete from fish_catch_details where fbz = ?",
      [splitFBZ(req.body.fbz)],
      function (err, rows) {
        if (!err) {
          conn.query(
            "select * from fish_catch_reports where fbz = ? and year = ?",
            [splitFBZ(req.body.fbz), req.body.year],
            function (err, rows) {
              if (!err) {
                if (rows.length) {
                  conn.query(
                    "UPDATE fish_catch_reports set ? where id = ?",
                    [req.body, rows[0].id],
                    function (err, rows) {
                      conn.release();
                      if (!err) {
                        req.body["firstname"] = req.user.user.firstname;
                        req.body["lastname"] = req.user.user.lastname;
                        makeRequest(
                          req.body,
                          "mail/sendNotificationToAdminForCompletedFishCatchReport",
                          res
                        );
                      } else {
                        logger.log("error", err.sql + ". " + err.sqlMessage);
                        res.json(false);
                      }
                    }
                  );
                } else {
                  conn.query(
                    "INSERT INTO fish_catch_reports set ?",
                    [req.body],
                    function (err, rows) {
                      conn.release();
                      if (!err) {
                        req.body["firstname"] = req.user.user.firstname;
                        req.body["lastname"] = req.user.user.lastname;
                        makeRequest(
                          req.body,
                          "mail/sendNotificationToAdminForCompletedFishCatchReport",
                          res
                        );
                      } else {
                        logger.log("error", err.sql + ". " + err.sqlMessage);
                        res.json(false);
                      }
                    }
                  );
                }
              } else {
                logger.log("error", err.sql + ". " + err.sqlMessage);
                res.json(false);
              }
            }
          );
        } else {
          logger.log("error", err.sql + ". " + err.sqlMessage);
          res.json(false);
        }
      }
    );
  });
});

router.post(
  "/requestToAdminForAdditionalFishCatchReportChanges",
  auth,
  function (req, res) {
    connection.getConnection(function (err, conn) {
      if (err) {
        logger.log("error", err.sql + ". " + err.sqlMessage);
        res.json(err);
      }

      req.body["firstname"] = req.user.user.firstname;
      req.body["lastname"] = req.user.user.lastname;
      makeRequest(
        req.body,
        "mail/sendRequestToAdminForAdditionalFishCatchReportChanges",
        res
      );
    });
  }
);

//#endregion

//#region HELPFUL FUNCTION

function splitFBZ(fbz) {
  return fbz ? (fbz.indexOf(".") != -1 ? fbz.split(".")[0] : fbz) : null;
}

//#endregion
