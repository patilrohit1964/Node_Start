const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../config/.env" });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "patilrohit19649@gmail.com",
    pass: process.env.EMAIL_APP_PASS,
  },
});

async function sendMail(mailId, htmlTemplate) {
  const mailOptions = {
    from: "patilrohit19649@gmail.com",
    to: "richerloginer@gmail.com",
    subject: "Please check our note web app for createive add notes",
    html: htmlTemplate,
  };
  const sendMailInfo = transporter.sendMail(mailOptions);
  return sendMailInfo;
}
console.log(
  process.env.EMAIL_APP_PASS,
  "env app password: " + process.env.EMAIL_APP_PASS
);

module.exports = sendMail;
