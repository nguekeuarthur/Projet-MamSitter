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
  // Profil 
  bio: { type: String, default: '' },
  hourlyRate: { type: Number, default: 0 },
  avatar: { type: String, default: '' },

  // Géolocalisation
  city: { type: String, default: '' },
  postalCode: { type: String, default: '' },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },

  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ location: '2dsphere' });

export const User = mongoose.model('User', userSchema);
