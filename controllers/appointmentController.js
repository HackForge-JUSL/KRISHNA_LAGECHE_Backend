import Appointment from '../model/appointmentmodel';


export const createAppointment = async (req,res) =>{
    try {
        const { patientId, doctorId, date, time } = req.body;

        if (!patientId || !doctorId || !date || !time) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        const appointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            date,
            time
        });
        
        const savedAppointment = await appointment.save();

        res.status(200).json(savedAppointment);
    } catch (error) {
        return res.status(500).json({ msg: 'Error Creating Appointment' });
    }
}
