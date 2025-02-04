import { Schema, model, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';
import { ApiError } from "../utils/ApiError.js";

// Define the interface for the user schema
interface IUser {
  userName: string;
  email: string;
  password: string;
  role: "owner" | "employee";
  refreshToken?: string; // Optional field
  createdAt?: Date;
  updatedAt?: Date;
}

// Extend Document to include the IUser interface
export interface IOwnerDocument extends IUser, Document {
  isModified: (path: string) => boolean; // Add any Mongoose-specific methods
}

// Create the schema
const ownerSchema = new Schema<IOwnerDocument>({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["owner","employee"],
    default: "employee",
  },
  refreshToken: {
    type: String,
  },
}, {
  timestamps: true,
  versionKey: false
});

// Pre-save hook to hash the password
ownerSchema.pre<IOwnerDocument>('save', async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      if (this.password) {
        const saltRounds = 12;
        const encryptedPass = await bcrypt.hash(this.password, saltRounds);
        this.password = encryptedPass;
      }
    }
    next();
  } catch (error) {
    console.error(error);
    throw new ApiError(420,"Mongo DB")
  }
});

// Create the model with explicit typing
const OwnerModel: Model<IOwnerDocument> = model<IOwnerDocument>("owner", ownerSchema);

export default OwnerModel;
