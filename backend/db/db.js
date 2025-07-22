import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const localdb = process.env.LOCAL_DB;
const dbURI = process.env.DB_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(localdb);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect mongodb: ", error);
    process.exit(1);
  }
};

export default connectDB;
