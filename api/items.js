import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the database connection
let cachedDb = null;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Use existing model or create new one
const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

async function connectDB() {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  cachedDb = db;
  return db;
}

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const items = await Item.find().sort({ createdAt: -1 });
      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const item = new Item({
        name: req.body.name,
        description: req.body.description
      });
      const savedItem = await item.save();
      return res.status(201).json(savedItem);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
