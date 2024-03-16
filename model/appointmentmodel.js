import mongoose from "mongoose";

const appointmentSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },
    date:{
        type: Date,
        required: true,
    },
    time:{
        type: Date,
        required: true,
    }
})


const Appointment= mongoose.model('token',appointmentSchema);

export default Appointment;