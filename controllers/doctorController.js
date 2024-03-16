import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

import Doctor from "../model/doctormodel.js";
import Otpmodel from "../model/otpmodel.js"
import Token from "../model/tokenmodel.js";


dotenv.config();


//SignUp Doctor
export const signupDoctor = async (req, res) => {
    try {
        let doctor= await Doctor.findOne({email: req.body.email});

        if(doctor){
            return res.status(400).json({ msg: "Email Already Exists" });
        }else{
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            const doctor = { name: req.body.name, email: req.body.email, password: hashedPassword };
            const newDoctor = new Doctor(doctor);
            await newDoctor.save();
            await Otpmodel.deleteMany({ email: req.body.email });
            return res.status(200).json({ msg: "SignUp Successful" });
        }
    } catch (error) {
        console.log("Error while Signing Up:", error);
        return res.status(500).json({ msg: "Error in SignUp" });
    }
}


//Login Doctor
export const loginDoctor = async (req,res) => {
    let doctor= await Doctor.findOne({email: req.body.email});
    if(!doctor){
        return res.status(400).json({ msg: "Username does not match" });
    }

    try {
        let match=await bcryptjs.compare(req.body.password,doctor.password);
        if(match){
            const accessToken=jwt.sign(doctor.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '5d'});
            const refreshToken=jwt.sign(doctor.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken=new Token({token: refreshToken});
            await newToken.save();

            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:doctor.name,email:doctor.email});
        }
        else{
            return res.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error while login in doctor" });
    }   
}

//Update Doctor
export const updateDoctor = async (req,res) => {
    try {
        const data = req.body;
        let doctor= await Doctor.findOne({email: req.user.email});
        if(!doctor){
            return res.status(400).json({ msg: "Username does not match" });
        }
        await Doctor.findOneAndUpdate({email: req.user.email}, {$set: data});
        return res.status(200).json({ msg: "Details updated successfully" });
    } catch (error) {
        return res.status(500).json({ msg: "Error while updating details of doctor" });
    }   
}