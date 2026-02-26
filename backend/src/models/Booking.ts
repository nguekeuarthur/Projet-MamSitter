import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    mamanId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sitterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    packageName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: ['EUR', 'CHF'], default: 'EUR' },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'completed'],
        default: 'pending'
    },
    stripeSessionId: { type: String },
    paymentIntentId: { type: String },
    splitAdminAmount: { type: Number },
    splitSitterAmount: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model('Booking', bookingSchema);
