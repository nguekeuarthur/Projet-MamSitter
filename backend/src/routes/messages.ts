import { Router, Request, Response } from 'express';
import { Message } from '../models/Message';
import { User } from '../models/User';
import { authenticate, authorize } from '../middleware/auth';
import { filterContent } from '../utils/messageFilter';

const router = Router();

// Envoyer un message
router.post('/', authenticate, async (req: any, res: Response): Promise<void> => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    if (!content || content.trim() === '') {
      res.status(400).json({ error: 'Le message ne peut pas être vide.' });
      return;
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      res.status(404).json({ error: 'Destinataire introuvable.' });
      return;
    }

    // Appliquer le filtre de sécurité
    const { filteredText, isFlagged } = filterContent(content);

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content: filteredText,
      originalContent: isFlagged ? content : undefined, // On garde l'original si flaggé pour l'admin
      isFlagged: isFlagged
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erreur envoi message:', error);
    res.status(500).json({ error: 'Erreur lors de l’envoi du message.' });
  }
});

// Récupérer la liste des conversations (derniers messages de chaque chat)
router.get('/conversations', authenticate, async (req: any, res: Response) => {
  try {
    const userId = req.user._id;

    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $lt: ['$sender', '$receiver'] },
              { s: '$sender', r: '$receiver' },
              { s: '$receiver', r: '$sender' }
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'lastMessage.sender',
          foreignField: '_id',
          as: 'senderInfo'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'lastMessage.receiver',
          foreignField: '_id',
          as: 'receiverInfo'
        }
      }
    ]);

    res.json(messages);
  } catch (error) {
    console.error('Erreur conversations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des conversations.' });
  }
});

// Récupérer les messages d'une conversation spécifique
router.get('/:otherUserId', authenticate, async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { otherUserId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId }
      ]
    }).sort({ createdAt: 1 });

    // Marquer comme lu
    await Message.updateMany(
      { sender: otherUserId, receiver: userId, read: false },
      { $set: { read: true } }
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
  }
});

// --- ADMIN ---

// Récupérer tous les messages flaggés (pour la cliente)
router.get('/admin/flagged', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const flagged = await Message.find({ isFlagged: true })
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role')
      .sort({ createdAt: -1 });
    res.json(flagged);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

export default router;