import mongoose from "mongoose";

const doctorSchema= mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    age: {
        type: Number,
        default: "",
    },
    gender: {
        type: String,
        default: "others",
    },
    about: {
        type: String,
        default: "",
    },
    mobile: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    specialization: {
        type: String,
        default: "",
    },
    experience: {
        type: String,
        default: "",
    },
    fees: {
        type: String,
        default: "",
    },
});


const Doctor= mongoose.model('doctor',doctorSchema);

export default Doctor;

