import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "doctor",
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  fees: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: true,
  },
});

const Appointment = mongoose.model("appointment", appointmentSchema);

export default Appointment;
