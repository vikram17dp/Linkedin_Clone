import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config();

const token = process.env.MAIL_TRAP_TOKEN;

export const mailtrapclient = new MailtrapClient({
  token:token
})

export const sender = {
  email:process.env.EMAIL_FROM,
  name:process.env.EMAIL_FROM_NAME
}