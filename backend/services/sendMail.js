const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async ({ emailReceiver, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  console.log("Email:", process.env.MAIL_USER);
  console.log("Password:", process.env.MAIL_PASS ? "OK" : "MISSING");

  const message = {
    from: `"BK Library" <${process.env.MAIL_USER}>`,
    to: emailReceiver,
    subject: subject,
    html: html,
  };

  const result = await transporter.sendMail(message);

  return result;
};

module.exports = sendMail;
