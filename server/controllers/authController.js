import bcrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) return res.json({message: 'All fields are required'});
    try {
        const existignUser = await userModel.findOne({email});
        if(existignUser) return res.json({message: 'User already exists'});
        const hashedPassword = await bcrpt.hash(password, 12);
        const user =new userModel({name, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}); //this will create a token with the user id and the secret key and it will expire in 7 days
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000 // 7 days
        }); //this will set the token in the cookie
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Stock Market Predictor',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
                    <header style="text-align: center; padding: 20px 0; background-color: #4CAF50; color: white; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; font-size: 24px;">Stock Market Predictor</h1>
                    </header>
                    <main style="padding: 20px; text-align: left;">
                        <h2 style="color: #333;">Hello ${name},</h2>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            Welcome to <strong>Stock Market Predictor</strong>! We are thrilled to have you on board.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            With our tools and insights, you'll have access to powerful features to help you make informed decisions about the stock market.
                        </p>
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">
                            If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@stockmarketpredictor.com" style="color: #4CAF50;">support@stockmarketpredictor.com</a>.
                        </p>
                    </main>
                    <footer style="text-align: center; padding: 20px 0; color: #999; font-size: 14px; background-color: #f1f1f1; border-radius: 0 0 8px 8px;">
                        &copy; ${new Date().getFullYear()} Stock Market Predictor. All rights reserved.
                    </footer>
                </div>
            `
        };
        
        await transporter.sendMail(mailOptions);
        return res.json({success:true, message: 'User created'});
        //we are creating a cookie during signup so that the user is logged in as soon as they sign up
    } catch (error) {
        return res.json({success:false,message: error.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.json({message: 'All fields are required'});
    try {
        const user = await userModel.findOne({email});
        if(!user) return res.json({success:false,message: 'User does not exist'});
        if(!await bcrpt.compare(password, user.password)) return res.json({success:false,message: 'Invalid credentials'});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}); //this will create a token with the user id and the secret key and it will expire in 7 days
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000 // 7 days
        });
        return res.json({success:true,message: 'Login successful'});
    } catch (error) {
        return res.json({success:false,message: error.message});
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: 'Logged out successfully!' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const sendVerifyOtp = async (req, res) => {
    try{
        const userId=req.userId;
        const user=await userModel.findById(userId);
        //console.log(user,userId);
        if(user.isAccountVerified) return res.json({success:false,message: 'Account already verified'});
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.verifyOtp=otp
        user.verifyOtpExpireAt=Date.now()+24*60*60*1000;
        await user.save();
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border: 1px solid #dddddd;
                            border-radius: 10px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            text-align: center;
                            padding: 20px;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                            text-align: center;
                        }
                        .otp {
                            font-size: 32px;
                            font-weight: bold;
                            color: #333;
                            margin: 20px 0;
                        }
                        .footer {
                            font-size: 14px;
                            color: #888;
                            text-align: center;
                            padding: 10px 20px;
                            background-color: #f1f1f1;
                        }
                        a {
                            color: #4CAF50;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            Account Verification
                        </div>
                        <div class="content">
                            <p>Dear ${user.name},</p>
                            <p>Thank you for signing up. Use the OTP below to verify your account:</p>
                            <div class="otp">${otp}</div>
                            <p>This OTP is valid for 1 day from now.</p>
                            <p>If you did not request this, please ignore this email or contact our support team.</p>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                            <p><a href="https://yourcompany.com">Visit our website</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        await transporter.sendMail(mailOption);
        return res.json({success:true,message: 'OTP sent'});
        
    }catch(error){
        return res.json({success:false,message: error.message});
    }
};

export const verifyOtp = async (req, res) => {
    const userId=req.userId;
    const otp=req.body.otp;
    //const{userId, otp}=req.body;
    if(!otp || !userId) return res.json({success:false,message: 'OTP is required'});
    try{
        const user = await userModel.findById(userId);

        if(!user) return res.json({success:false,message: 'Invalid user'});
        if(user.verifyOtp==='' || user.verifyOtp!==otp) return res.json({success:false,message: 'Invalid OTP'});
        if(user.verifyOtpExpireAt<Date.now()) return res.json({success:false,message: 'OTP expired'});
        user.isAccountVerified=true;
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        await user.save();
        return res.json({success:true, message: 'Account verified'});
    }
    catch(error){
        return res.json({success:false, message: error.message});
    }
};

export const isAuthenticated = (req, res) => { //
    try {
        return res.json({success:true,message: 'Authenticated'}); //this will return a message saying Authenticated if the user is authenticated
    } catch (error) {
        return res.json({success:false,message: error.message});
    }
};

export const sendResetOtp = async (req, res) => {
    const email=req.body.email;
    if(!email) return res.json({success:false,message: 'Email is required'});
    try{
        const user=await userModel.findOne({email});
        if(!user) return res.json({success:false,message: 'User not found'});
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.resetOtp=otp;
        user.resetOtpExpireAt=Date.now()+15*60*1000;
        await user.save();
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset OTP</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border: 1px solid #dddddd;
                            border-radius: 10px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #FF5733;
                            color: white;
                            text-align: center;
                            padding: 20px;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                            text-align: center;
                        }
                        .otp {
                            font-size: 32px;
                            font-weight: bold;
                            color: #333;
                            margin: 20px 0;
                        }
                        .footer {
                            font-size: 14px;
                            color: #888;
                            text-align: center;
                            padding: 10px 20px;
                            background-color: #f1f1f1;
                        }
                        a {
                            color: #FF5733;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            Password Reset Request
                        </div>
                        <div class="content">
                            <p>Dear ${user.name},</p>
                            <p>We received a request to reset your password. Use the OTP below to proceed with resetting your password:</p>
                            <div class="otp">${otp}</div>
                            <p>This OTP is valid for the next 15 minutes.</p>
                            <p>If you did not request a password reset, please ignore this email or contact our support team.</p>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
                            <p><a href="https://yourcompany.com">Visit our website</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        await transporter.sendMail(mailOption);
        return res.json({success:true,message: 'OTP sent to reset password'});
    }catch(error){
        return res.json({success:false,message: error.message});
    }
}

//reset user password
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword) return res.json({success:false,message: 'All fields are required'});
    try{
        const user = await userModel.findOne({email});
        if(!user) return res.json({success:false,message: 'User not found'});
        if(user.resetOtp==='' || user.resetOtp!==otp) return res.json({success:false,message: 'Invalid OTP'});
        if(user.resetOtpExpireAt<Date.now()) return res.json({success:false,message: 'OTP expired'});
        user.password=await bcrpt.hash(newPassword, 12);
        user.resetOtp='';
        user.resetOtpExpireAt=0;
        await user.save();
        return res.json({success:true,message: 'Password reset successful'});
    }catch(error){
        return res.json({success:false,message: error.message});
    }
}