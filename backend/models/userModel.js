import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
        type: String,
        enum: ['Admin', 'Editor']
    },
}, { timestamps: true });

const Users = mongoose.model("users", userSchema);

export default Users;
