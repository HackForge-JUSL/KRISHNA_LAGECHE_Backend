import mongoose from "mongoose";

const userSchema= mongoose.Schema({
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
    

});


const User= mongoose.model('user',userSchema);

export default User;

