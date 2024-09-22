import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    googleId: string; // Store Google ID
    email: string; // Store email
    displayName: string; // Store user's display name
}

const userSchema = new Schema<IUser>({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model<IUser>("User", userSchema);

export default User;