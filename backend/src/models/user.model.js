import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    location: {
        type: String,
        lowercase: true,
        required: true,
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)