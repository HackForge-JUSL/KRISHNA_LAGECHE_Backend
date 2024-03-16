import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const sendMail = async (mailOptions)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER_NAME,
                pass: process.env.MAIL_PASS_KEY,
            },
        });
        
        await transporter.sendMail(mailOptions);
        console.log("Email send success!");
    } catch (error) {
        console.log("Error Nodemailer is not able to send the email ",error);
    }
};