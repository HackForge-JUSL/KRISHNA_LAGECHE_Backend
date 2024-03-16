import express from 'express';

import { sendOtp } from '../controllers/sendOtpController.js';
import {verifyOTP} from '../controllers/verifyOtpController.js'
import { loginUser,signupUser, updateUser } from '../controllers/userController.js';
import { loginDoctor, signupDoctor, updateDoctor } from '../controllers/doctorController.js';
import { authenticateToken } from '../middleware/jwtAuth.js';
import { getAllDoctors, getDoctor } from '../controllers/doctorController.js';
import { createPrescription, getAllPrescriptions, getPrescription} from '../controllers/prescriptionController.js'
import { createAppointment, getAllAppointments, getAppointment } from '../controllers/appointmentController.js';

const router=express.Router();

//user auth routes
router.post('/user/signup',signupUser);
router.post('/user/login',loginUser);
router.put('/user/update',authenticateToken, updateUser);

//doctor auth routes
router.post('/doctor/signup',signupDoctor);
router.post('/doctor/login',loginDoctor);
router.put('/doctor/update',authenticateToken, updateDoctor);

//doctor get routes
router.get('/doctor/all',getAllDoctors);
router.get('/doctor/:id',authenticateToken,getDoctor);

//otp routes
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOTP);

// prescription routes
router.post('/prescription/create', authenticateToken, createPrescription);
router.get('/prescription/all', authenticateToken, getAllPrescriptions);
router.get('/prescription/:id', getPrescription);

// appointment routes
router.post('/appointment/create', authenticateToken, createAppointment);
router.get('/appointment/all', authenticateToken, getAllAppointments);
router.get('/appointment/:id', getAppointment);

export default router;