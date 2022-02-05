import mongoose from 'mongoose';
import 'dotenv/config';
try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
} catch (error) {
    console.error(error);
}

const connection = mongoose.connection;
export { connection };