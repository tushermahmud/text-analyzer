import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IUser } from "./User";

export interface IText extends Document {
  content: string;
  userId: IUser['_id'];
}

const textSchema: Schema<IText> = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Text = mongoose.model<IText>("text", textSchema);

export default Text;
