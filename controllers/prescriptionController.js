import dotenv from 'dotenv';
import Doctor from '../model/doctormodel.js';
import Prescription from '../model/prescriptionmodel.js';
import User from '../model/usermodel.js';

dotenv.config();

//Create Prescription
export const createPrescription = async (req, res) => {
    try {
        let doctor= await Doctor.findOne({email: req.user.email});
        if(!doctor){
            return res.status(400).json({ msg: "Only doctors can create prescription" });
        }else{
            const { userEmail, signature, topic, description, date } = req.body;

            if (!userEmail || !signature || !topic || !description || !date) {
                return res.status(400).json({ msg: 'Missing required fields' });
            }

            const user = await User.findOne({email: userEmail});

            if(!user) {
                return res.status(400).json({ msg: "User doesnot exist" });
            } else {
                const prescription = { user: user, doctor: doctor, topic: topic, description: description, date: date, signature: signature };
                const newPrescription = new Prescription(prescription);
                await newPrescription.save();
                return res.status(200).json({ msg: "Created prescription successful" });
            }
        }
    } catch (error) {
        console.log("Error while creating prescription : ", error);
        return res.status(500).json({ msg: "Error in Creating Prescription" });
    }
}

//Get all prescriptions
export const getAllPrescriptions = async (req, res) => {
    try {
        let user = await User.findOne({email: req.user.email});
        if(!user) {
            const doctor = await Doctor.findOne({email: req.user.email});
            const prescriptions = await Prescription.find({doctor: doctor}).populate("user").populate("doctor");
            if(!prescriptions) {
                return res.status(400).json({ msg: "No prescriptions for this doctor" });
            } else {
                return res.status(200).json({ msg: "Successfully fetched all the prescriptions for doctor", data: prescriptions });
            }
        } else {
            const prescriptions = await Prescription.find({user: user}).populate("user").populate("doctor");
            if(!prescriptions) {
                return res.status(400).json({ msg: "No prescriptions for this user" });
            } else {
                return res.status(200).json({ msg: "Successfully fetched all the prescriptions for user", data: prescriptions });
            }
        }
    } catch (error) {
        console.log("Error while fetching prescription : ", error);
        return res.status(500).json({ msg: "Error in fetching Prescription" });
    }
}

//Get particular prescription
export const getPrescription = async (req,res) => {
    try {
        const id = req.params.id;
        const prescription = await Prescription.findOne({_id: id}).populate("user").populate("doctor");
        if(!prescription) {
            return res.status(400).json({ msg: "Prescription doesnot exist" });
        } else {
            return res.status(200).json({ msg: "Successfully fetched the prescription", data: prescription});
        }
    } catch (error) {
        console.log("Error while fetching particular prescription : ", error);
        return res.status(500).json({ msg: "Error in fetching particular Prescription" });
    }
}