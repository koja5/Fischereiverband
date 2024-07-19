require("dotenv").config();
var express = require("express");
var nodemailer = require("nodemailer");
var router = express.Router();
var hogan = require("hogan.js");
var fs = require("fs");
const logger = require("../config/logger");
const sendMail = require("./providers/send-mail");
const sha1 = require("sha1");

module.exports = router;

var smtpTransport = nodemailer.createTransport({
  host: process.env.smtp_host,
  port: process.env.smtp_port,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.smtp_user,
    pass: process.env.smtp_pass,
  },
});

//#region OWNER

router.post(
  "/sendNotificationToAdminForCompletedFishStockingReport",
  function (req, res, next) {
    var configuration = JSON.parse(
      fs.readFileSync(
        "./providers/mails/i18n/send_notification_to_admin_for_completed_fish_stocking_report.json",
        "utf-8"
      )
    );

    let subject = configuration.language.de.subject;
    let body = configuration.language.de.body;

    body.message = body.message
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    body["name"] = req.body.firstname + " " + req.body.lastname;
    body["fbz"] = req.body.fbz;
    body["year"] = req.body.year;

    body["checkReportLink"] =
      process.env.link_client +
      "dashboard/admin/fish-stocking-report-details?fbz=" +
      req.body.fbz +
      "&year=" +
      req.body.year;

    subject = subject
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    sendMail(
      process.env.admin_email,
      subject,
      body,
      configuration.template,
      res
    );
  }
);

router.post(
  "/sendRequestToAdminForAdditionalFishStockingReportChanges",
  function (req, res, next) {
    var configuration = JSON.parse(
      fs.readFileSync(
        "./providers/mails/i18n/send_request_to_admin_for_additional_fish_stocking_report_changes.json",
        "utf-8"
      )
    );

    let subject = configuration.language.de.subject;
    let body = configuration.language.de.body;

    body.message = body.message
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    body["name"] = req.body.firstname + " " + req.body.lastname;
    body["fbz"] = req.body.fbz;
    body["year"] = req.body.year;

    body["checkReportDetailsLink"] =
      process.env.link_client +
      "dashboard/admin/fish-stocking-report-details?fbz=" +
      req.body.fbz +
      "&year=" +
      req.body.year;

    subject = subject
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    sendMail(
      process.env.admin_email,
      subject,
      body,
      configuration.template,
      res
    );
  }
);

//#endregion

//#region ADMIN

router.post(
  "/sendNotificationToOwnerForBackFishStockingReport",
  function (req, res, next) {
    var configuration = JSON.parse(
      fs.readFileSync(
        "./providers/mails/i18n/send_notification_to_owner_for_back_fish_stocking_report.json",
        "utf-8"
      )
    );

    let subject = configuration.language.de.subject;
    let body = configuration.language.de.body;

    body.greetings = body.greetings.replace(
      "#name",
      req.body.userProfile.firstname
    );
    body.message = body.message.replaceAll(
      "#fbz",
      req.body.fishStockingReport.fbz
    );
    subject = subject.replaceAll("#fbz", req.body.fishStockingReport.fbz);

    sendMail(
      req.body.userProfile.email,
      subject,
      body,
      configuration.template,
      res
    );
  }
);

router.post(
  "/reminderOwnerToCompleteFishStockingReport",
  function (req, res, next) {
    var configuration = JSON.parse(
      fs.readFileSync(
        "./providers/mails/i18n/send_reminder_owner_to_complete_fish_stocking_report.json",
        "utf-8"
      )
    );

    let subject = configuration.language.de.subject;
    let body = configuration.language.de.body;

    body.greetings = body.greetings.replace(
      "#name",
      req.body.userProfile.firstname
    );
    body.message = body.message.replaceAll(
      "#fbz",
      req.body.fishStockingReport.fbz
    );
    subject = subject.replaceAll("#fbz", req.body.fishStockingReport.fbz);

    sendMail(
      req.body.userProfile.email,
      subject,
      body,
      configuration.template,
      res
    );
  }
);

//#endregion

//#region AUTH

router.post("/resetPasswordLink", function (req, res, next) {
  var configuration = JSON.parse(
    fs.readFileSync("./providers/mails/i18n/forgot_password.json", "utf-8")
  );

  body = getMessage(configuration, req.body.lang);

  // generate reset password
  body["reset_password_link"] =
    process.env.link_client + "auth/reset-password/" + sha1(req.body.email);

  sendMail(
    req.body.email,
    getSubject(configuration, req.body.lang),
    body,
    configuration.template
  );
});

//#endregion

//#region FISH CATCH

router.post(
  "/sendNotificationToAdminForCompletedFishCatchReport",
  function (req, res, next) {
    var configuration = JSON.parse(
      fs.readFileSync(
        "./providers/mails/i18n/send_notification_to_admin_for_completed_fish_catch_report.json",
        "utf-8"
      )
    );

    let subject = configuration.language.de.subject;
    let body = configuration.language.de.body;

    body.message = body.message
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    body["name"] = req.body.firstname + " " + req.body.lastname;
    body["fbz"] = req.body.fbz;
    body["year"] = req.body.year;

    body["checkReportLink"] =
      process.env.link_client +
      "dashboard/admin/fish-stocking-report-details?fbz=" +
      req.body.fbz +
      "&year=" +
      req.body.year;

    subject = subject
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    console.log(body);

    sendMail(
      process.env.admin_email,
      subject,
      body,
      configuration.template,
      res
    );
  }
);

router.post(
  "/sendRequestToAdminForAdditionalFishCatchReportChanges",
  function (req, res, next) {
    var configuration = JSON.parse(
      fs.readFileSync(
        "./providers/mails/i18n/send_request_to_admin_for_additional_fish_catch_report_changes.json",
        "utf-8"
      )
    );

    let subject = configuration.language.de.subject;
    let body = configuration.language.de.body;

    body.message = body.message
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    body["name"] = req.body.firstname + " " + req.body.lastname;
    body["fbz"] = req.body.fbz;
    body["year"] = req.body.year;

    body["checkReportDetailsLink"] =
      process.env.link_client +
      "dashboard/admin/fish-stocking-report-details?fbz=" +
      req.body.fbz +
      "&year=" +
      req.body.year;

    subject = subject
      .replaceAll("#fbz", req.body.fbz)
      .replaceAll("#name", req.body.firstname + " " + req.body.lastname);

    sendMail(
      process.env.admin_email,
      subject,
      body,
      configuration.template,
      res
    );
  }
);

//#endregion

//#region HELPFUL SERVICE

function getSubject(configuration, lang) {
  if (lang) {
    return configuration.language[lang].subject;
  } else {
    return configuration.language.de.subject;
  }
}

function getMessage(configuration, lang) {
  if (lang) {
    return configuration.language[lang].body;
  } else {
    return configuration.language.de.body;
  }
}

//#endregion
