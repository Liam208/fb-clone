import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({ path: '../.env'})

const dbURI = process.env.DB_URI
const test = "mongodb+srv://Liam:SuTnkqCAUkb38kYt@cluster0.bdbstdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error("Failed to connect mongodb: ", error)
        process.exit(1)
    }
}

export default connectDB