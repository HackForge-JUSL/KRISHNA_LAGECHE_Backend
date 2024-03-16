import Otpmodel from "../model/otpmodel.js";

export const verifyOTP = async (req,res) =>{
    try {
        let user = await Otpmodel.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({msg: "UserName is not Provided"});
        }
        // let otp= await Otpmodel.findOne({ otpValue: req.body.otpValue }); 
        let storedOTP = user.otpValue;
        let enteredOTP = req.body.otpValue;
        if(storedOTP !== enteredOTP){
            return res.status(400).json({ msg: "OTP does not match" });
        }
        else{
            return res.status(200).json({ msg: "OTP is verified successfully" });
        }
        
    } catch (error) {
        return res.status(500).json({ msg: "Error while verifying the OTP" });
    }
}
