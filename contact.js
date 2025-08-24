import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, projectType, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // set in Vercel
        pass: process.env.EMAIL_PASS, // Gmail app password
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL, // your inbox
      subject: `📩 New Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Project Type: ${projectType}
        Message: ${message}
      `,
    });

    return res.status(200).json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error("Email error:", err);
    return res.status(500).json({ success: false, message: "Error sending message" });
  }
}
