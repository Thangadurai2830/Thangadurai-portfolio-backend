const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Message from ${name}`,
    text: `Message: ${message}\nFrom: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
});

module.exports = router;
