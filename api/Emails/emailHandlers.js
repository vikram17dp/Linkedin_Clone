import { mailtrapclient, sender } from "../lib/test.mailtrap.js";

import {
  createWelcomeEmailTemplate,
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
} from "./emailTemplates.js";


export const sendEmail = async (email, name, profileUrl)=>{
    const recipient = [{email}];

    try {
        const response = await mailtrapclient.send({
			from: sender,
			to: recipient,
			subject: "Welcome to UnLinked",
			html: createWelcomeEmailTemplate(name, profileUrl),
			category: "welcome",
		});
        console.log("Welcome Email sent successfully!",response);
        

    } catch (error) {
        throw error
    }
}