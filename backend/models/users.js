import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }

})

const UserDB = mongoose.model('Users', UserSchema)

export default UserDB