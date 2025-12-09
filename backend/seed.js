import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

const seedData = [
  {
    name: 'Project Alpha',
    description: 'First AEC project for building design'
  },
  {
    name: 'Project Beta',
    description: 'Construction planning and scheduling'
  },
  {
    name: 'Project Gamma',
    description: 'Infrastructure development and analysis'
  },
  {
    name: 'Design Tool Set',
    description: 'CAD and BIM integration tools'
  },
  {
    name: 'Cost Estimation Module',
    description: 'Budget planning and cost analysis for construction'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully!');

    // Clear existing data
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert seed data
    const items = await Item.insertMany(seedData);
    console.log(`Successfully seeded ${items.length} items:`);
    items.forEach(item => {
      console.log(`  - ${item.name}: ${item.description}`);
    });

    // Disconnect
    await mongoose.disconnect();
    console.log('\nDatabase seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
