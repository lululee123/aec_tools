import mongoose from 'mongoose';

// Clean and validate MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI?.trim().replace(/\s+/g, '');

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI environment variable');
}

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

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

async function connectDB() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    cachedDb = db;
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectDB();

    if (req.method === 'GET') {
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      return res.status(200).json(item);
    }

    if (req.method === 'PUT') {
      const item = await Item.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          description: req.body.description
        },
        { new: true, runValidators: true }
      );
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      return res.status(200).json(item);
    }

    if (req.method === 'DELETE') {
      const item = await Item.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      return res.status(200).json({ message: 'Item deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
