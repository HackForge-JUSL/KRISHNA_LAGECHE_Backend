import  Otpmodel from "../model/otpmodel.js"
import dotenv from 'dotenv';
import {generateOTP} from "../utils/generateOTP.js"
import { sendMail } from "../utils/sendMail.js";

dotenv.config();


export const sendOtp = async (req,res) =>{

    try {
        if(!req.body.username){
            return res.status(400).json({ msg: "Email Not Defined" });
        }

        let otpValue= generateOTP();
        // console.log({otpValue});

        let user = await Otpmodel.findOne({username: req.body.username});
        if(user){
            user.otpValue = otpValue;
            await user.save();
        }else{
            const otpmodel= {otpValue, username: req.body.username};
            const newOTP =await new Otpmodel(otpmodel);
            await newOTP.save();
        }

        //nodemailer setup
        const mailOptions = {
            from: {
                name: process.env.MAIL_FROM_COMPANY,
                address: process.env.MAIL_USER_NAME
            },
            to: `${req.body.username}`, 
            subject: 'Your OTP for Signing Up to HeathCare',
            text: `Your OTP for singing up to HeathCare is: ${otpValue}` //OTP message
        };

        sendMail(mailOptions);

        return res.status(200).json({ msg: "OTP Send successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error while Sending the OTP" });
    }
}