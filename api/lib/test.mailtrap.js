import { MailtrapClient } from "mailtrap"
import dotenv from 'dotenv'
dotenv.config();

const TOKEN = process.env.MAIL_TRAP_CLIENT

const client = new MailtrapClient({
  token: TOKEN,
});
                       
const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
};

const recipients = [
  {
    email: "vikramdp505@gmail.com",
  },
];

async function sendEmail() {
  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      text: "Congrats for sending a test email with Mailtrap!",
      category: "Integration Test",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

sendEmail();
