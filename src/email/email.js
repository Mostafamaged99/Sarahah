import { createTransport } from "nodemailer";
import { emailHtml } from "./emailHtml.js";
import jwt from "jsonwebtoken";

export const sendEmails = async (email) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "moustfaabdo35@gmail.com",
      pass: "jbclrgtgngoljumi",
    },
  });

  jwt.sign({ email }, "thisIsMySecterKey", (err, token) => {
    const info = transporter.sendMail({
      from: '"Mostafa Abdo" <moustfaabdo35@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: emailHtml(token), // html body
    });
    console.log("Message sent: %s", info.messageId);
  });

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

// async..await is not allowed in global scope, must use a wrapper
