import express from 'express';

import { sendOtp } from '../controllers/sendOtpController.js';
import {verifyOTP} from '../controllers/verifyOtpController.js'

const router=express.Router();

router.post('/',sendOtp)
router.post('/verify',verifyOTP);

export default router;