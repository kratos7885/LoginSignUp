import express from 'express';
import { register,login,logout, sendVerifyOtp, verifyOtp, isAuthenticated, sendResetOtp, resetPassword } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();//this creates a new router object

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/verify-otp',userAuth,verifyOtp);
authRouter.get('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);
export default authRouter; //this exports the authRouter so that it can be used in the server.js file
//this file is the router for the auth routes. It will call the register, login and logout functions from the authController.js file when the user goes to the /register, /login and /logout routes respectively