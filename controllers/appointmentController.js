import dotenv from 'dotenv';
import Appointment from '../model/appointmentmodel.js';
import Doctor from '../model/doctormodel.js';
import User from '../model/usermodel.js';

dotenv.config();

// Create appointment
export const createAppointment = async (req,res) =>{
    try {
        const user = await User.findOne({email: req.user.email});
        if(!user) {
            return res.status(400).json({ msg: "Only users can create appointment" });
        } else {
            const { doctorId, date, time } = req.body;
    
            if (!doctorId || !date || !time) {
                return res.status(400).json({ msg: 'Missing required fields' });
            }

            const doctor = await Doctor.findById({_id: doctorId});
    
            if(!doctor) {
                return res.status(400).json({ msg: "Doctor doesnot exist" });
            } else {
                const appointment = new Appointment({ user: user, doctor: doctor, date, time });
                const savedAppointment = await appointment.save();
                res.status(200).json({ msg: "Appointment created successfully", data: savedAppointment });
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error Creating Appointment' });
    }
}

//Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        let user = await User.findOne({email: req.user.email});
        if(!user) {
            const doctor = await Doctor.findOne({email: req.user.email});
            const appointments = await Appointment.find({doctor: doctor}).populate("user").populate("doctor");
            if(!appointments) {
                return res.status(400).json({ msg: "No appointments for this doctor" });
            } else {
                return res.status(200).json({ msg: "Successfully fetched all the appointments for doctor", data: appointments });
            }
        } else {
            const appointments = await Appointment.find({user: user}).populate("user").populate("doctor");
            if(!appointments) {
                return res.status(400).json({ msg: "No appointments for this user" });
            } else {
                return res.status(200).json({ msg: "Successfully fetched all the appointments for user", data: appointments });
            }
        }
    } catch (error) {
        console.log("Error while fetching appointments : ", error);
        return res.status(500).json({ msg: "Error in fetching appointments" });
    }
}

//Get particular appointment
export const getAppointment = async (req,res) => {
    try {
        const id = req.params.id;
        const appointment = await Appointment.findOne({_id: id}).populate("user").populate("doctor");
        if(!appointment) {
            return res.status(400).json({ msg: "Appointment doesnot exist" });
        } else {
            return res.status(200).json({ msg: "Successfully fetched the appointment", data: appointment});
        }
    } catch (error) {
        console.log("Error while fetching particular appointment : ", error);
        return res.status(500).json({ msg: "Error in fetching particular Appointment" });
    }
}