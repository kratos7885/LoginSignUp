import mongoose from "mongoose";
 const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("Mongoose is connected")); //this is a listener that listens for when mongoose is connected so we know when the connection is successful
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);//this is the connection to the database mern-auth is the name of the database
 };
 export default connectDB; //this exports the connectDB function so we can use it in other files