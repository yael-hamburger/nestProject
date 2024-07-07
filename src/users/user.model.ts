import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
});

export interface User extends Document {
  id?: string;
  name: string;
  email: string;
  phone: string;
}
