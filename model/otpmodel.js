import mongoose from "mongoose";


const otpSchema=mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    otpValue:{
        type: String,
        required: true,
    },
})


const otpmodel= mongoose.model('otpmodel',otpSchema);

export default otpmodel;