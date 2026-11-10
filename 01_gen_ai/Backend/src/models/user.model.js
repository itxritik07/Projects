import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already taken"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "Account is already exist with this email address"],
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model("users", userSchema);