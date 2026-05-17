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
  shortDescription: { type: String, default: '', maxLength: 70 },
  hourlyRate: { type: Number, default: 0 },
  avatar: { type: String, default: '' },
  phone: { type: String, default: '' },
  languages: { type: [String], default: [] },
  diploma: { type: String, default: '' },
  childCount: { type: String, default: '' },
  availabilities: { type: mongoose.Schema.Types.Mixed, default: {} },

  // Validation Admin (Spécifique MamaSitters)
  idCard: { type: String, default: '' }, // Document d'identité (base64)
  criminalRecord: { type: String, default: '' }, // Extrait de casier judiciaire (base64)
  isApproved: { type: Boolean, default: false }, // Validation par l'admin
  approvedAt: { type: Date },

  // Engagements
  hasCriminalRecordCommitment: { type: Boolean, default: false },
  hasTaxCommitment: { type: Boolean, default: false },

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

  // Stripe Connect
  stripeAccountId: { type: String, default: '' },

  // Paiements hors Stripe (RIB / Virement)
  rib: { type: String, default: '' },
  bankInfo: { type: String, default: '' },

  // Bannissement
  isBanned: { type: Boolean, default: false },
  bannedAt: { type: Date },
});

userSchema.index({ location: '2dsphere' });

export const User = mongoose.model('User', userSchema);
