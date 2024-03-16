import express from 'express';

import { sendOtp } from '../controllers/sendOtpController.js';
import {verifyOTP} from '../controllers/verifyOtpController.js'
import { loginUser,signupUser } from '../controllers/userController.js';

const router=express.Router();

//user auth routes
router.post('/signup',signupUser);
router.post('/login',loginUser);



//otp routes
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOTP);

export default router;