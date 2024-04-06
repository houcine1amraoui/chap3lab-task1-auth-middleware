import nodemailer from "nodemailer";
import "dotenv/config";

const regex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
/*
(?=.*[a-z])	     => Must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])	     => Must contain at least 1 uppercase alphabetical character
(?=.*[0-9])	     => Must contain at least 1 numeric character
(?=.*[!@#$%^&*]) =>	Must contain at least one special character
(?=.{8,})	       => Must be eight characters or longer
*/

export function checkPassword(password) {
  let match = false;
  if (password.match(regex)) match = true;
  return match;
}

export const notify = async (to) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ACCOUNT_ADDRESS,
      pass: process.env.APP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.ACCOUNT_ADDRESS,
    to,
    subject: "Alert",
    text: "You account has been accessed!",
  });
};
