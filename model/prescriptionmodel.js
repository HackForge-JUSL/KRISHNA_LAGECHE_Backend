import mongoose from "mongoose";

const prescriptionSchema= mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const Prescription= mongoose.model('prescription',prescriptionSchema);

export default Prescription;

