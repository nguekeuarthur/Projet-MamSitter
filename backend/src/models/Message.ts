import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    originalContent: {
        type: String // Garder l'original pour l'admin si censuré
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index pour accélérer la récupération des conversations
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });

export const Message = mongoose.model('Message', messageSchema);
