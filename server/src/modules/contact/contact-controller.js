const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;

    const mailOptions = {
      from: `${name} <${email}>`,
      to,
      subject: subject || `Portfolio contact from ${name}`,
      text: `${message}\n\n---\nFrom: ${name} <${email}>`,
      html: `<p>${message.replace(/\n/g, "<br />")}</p><hr/><p>From: ${name} &lt;${email}&gt;</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Contact email error:", err);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

module.exports = { sendContactEmail };
