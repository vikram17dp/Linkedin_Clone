import { MailtrapClient } from "mailtrap";
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

export const sendcommentNotificationEmail = async (recipentEmail,recipentName,commentName,postUrl,commentContent)=>{
    const recipient = [{email:recipentEmail}];
    try {
        const response = await mailtrapclient.send({
            from:sender,
            to:recipient,
            subject:"New comment on your post",
            html:createCommentNotificationEmailTemplate(recipentName,recipentEmail,commentName,postUrl,commentContent)
        })
        console.log("comment notification sent successfully!",response);
        
    } catch (error) {
     throw error   
    }
}

export const sendConnectionAcceptedEmail = async(senderEmail, senderName, recipientName, profileUrl)=>{
    const recipient = [{email:senderEmail}];

    try {
        const  response = await MailtrapClient.send({
            from :sender,
            to:recipient,
            subject:`${recipientName} accepted your connection request`,
            html:createConnectionAcceptedEmailTemplate(senderName,recipientName,profileUrl),
            category:"connection_accepted"
        })
    } catch (error) {
        console.error(error)
    }
}