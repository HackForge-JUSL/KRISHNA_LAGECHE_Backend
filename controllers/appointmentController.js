import dotenv from 'dotenv';
import Appointment from '../model/appointmentmodel.js'
import Doctor from '../model/doctormodel.js';
import User from '../model/usermodel.js';
import Stripe from "stripe";
dotenv.config();

// Create appointment
export const getCheckoutSession = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.user._id);
        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get("host")}/doctor/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        unit_amount: doctor.fees * 100,
                        product_data: {
                            name: doctor.name,
                            description: doctor.about || "My about",
                            images: [doctor?.photo],
                        },
                    },
                    quantity: 1,
                },
            ],
            billing_address_collection: 'auto',
        });

        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toISOString().split('T')[1].split('.')[0]; 
        
        const booking = new Appointment({
            doctor: doctor._id,
            user: user._id,
            date: currentDate,
            time: currentTime,
            fees: doctor.fees,
            session: session.id,
            status: "pending",
            isPaid: true
        });
        await booking.save();
    
        res.status(200).json({ success: true, message: "Successfully paid", session });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
};

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