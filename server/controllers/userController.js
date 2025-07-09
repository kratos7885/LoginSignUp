import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const {userId} =req;
        const user = await userModel.findById(userId);
        if(!user) return res.json({message: 'User not found'});
        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
        }}); //this will send the user data to the client
    } catch (error) {
        res.json({message: 'Internal Server Error'});
    }
};