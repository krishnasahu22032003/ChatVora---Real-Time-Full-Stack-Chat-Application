import { ResendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplates.js"



export const sendWelcomeEmail = async (email:string,name:string,clientURL:string)=>{

const {data,error}=await ResendClient.emails.send({
    from:`${sender.name} <${sender.email}>`   ,
    to:email,
    subject: "Welcome to ChatVora"  ,  
    html: createWelcomeEmailTemplate(name,clientURL)
})

if(error){
    console.log("Error while sending welcome error",(error as Error).message)
    throw new Error ("Failed to send Welcome Email")
}

console.log("welcome email send successfully",data)

}