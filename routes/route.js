import express from 'express';

import { sendOtp } from '../controllers/sendOtpController.js';
import {verifyOTP} from '../controllers/verifyOtpController.js'
import { loginUser,signupUser } from '../controllers/userController.js';
import { loginDoctor, signupDoctor } from '../controllers/doctorController.js';

const router=express.Router();

//user auth routes
router.post('/user/signup',signupUser);
router.post('/user/login',loginUser);

//doctor auth routes
router.post('/doctor/signup',signupDoctor);
router.post('/doctor/login',loginDoctor);

//otp routes
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOTP);

export default router;