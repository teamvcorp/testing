import mongoose, { Schema, Document } from 'mongoose';

// Interface for User document
interface IUser extends Document {
  _id: string;
  googleId: string;
  name?: string;
  email: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
  email_verified?: boolean;
}

// Interface for Customer document
interface ICustomer extends Document {
  id: string;
  name: string;
  email: string;
  image_url: string;
}

// User Schema
const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
  googleId: { type: String, required: true, unique: true, index: true },
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  picture: { type: String },
  given_name: { type: String },
  family_name: { type: String },
  locale: { type: String },
  email_verified: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Customer Schema
const CustomerSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  image_url: { type: String, required: true }
}, {
  timestamps: true
});

// Create and export models
export const User = mongoose.model<IUser>('User', UserSchema);
export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);