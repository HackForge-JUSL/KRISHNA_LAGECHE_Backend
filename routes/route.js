import express from 'express';

import { sendOtp } from '../controllers/sendOtpController.js';
import {verifyOTP} from '../controllers/verifyOtpController.js'
import { loginUser,signupUser, updateUser } from '../controllers/userController.js';
import { loginDoctor, signupDoctor, updateDoctor } from '../controllers/doctorController.js';
import { authenticateToken } from '../middleware/jwtAuth.js';

const router=express.Router();

//user auth routes
router.post('/user/signup',signupUser);
router.post('/user/login',loginUser);
router.put('/user/update',authenticateToken, updateUser);

//doctor auth routes
router.post('/doctor/signup',signupDoctor);
router.post('/doctor/login',loginDoctor);
router.put('/doctor/update',authenticateToken, updateDoctor);

//otp routes
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOTP);

export default router;