import express from 'express';

import { sendOtp } from '../controllers/sendOtpController.js';
import {verifyOTP} from '../controllers/verifyOtpController.js'

const router=express.Router();



//otp routes
router.post('/sendotp',sendOtp)
router.post('/verifyotp',verifyOTP);

export default router;