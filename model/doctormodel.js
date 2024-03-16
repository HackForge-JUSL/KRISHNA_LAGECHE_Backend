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
        default: "neither",
    },
    mobile: {
        type: Number,
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
        type: Number,
        default: "",
    },
    fees: {
        type: Number,
        default: "",
    },
});


const Doctor= mongoose.model('doctor',doctorSchema);

export default Doctor;

