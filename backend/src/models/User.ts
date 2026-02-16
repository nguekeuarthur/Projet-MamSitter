import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  role: {
    type: String,
    enum: ['Maman', 'MamaSitter', 'Admin'],
    default: 'Maman'
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
