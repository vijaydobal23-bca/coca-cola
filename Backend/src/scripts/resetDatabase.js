import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const resetDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not set in environment variables.');
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });

    const dbName = mongoose.connection.db.databaseName;
    await mongoose.connection.dropDatabase();
    console.log(`Database "${dbName}" has been emptied successfully.`);
  } catch (error) {
    console.error(`Failed to reset database: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

resetDatabase();
