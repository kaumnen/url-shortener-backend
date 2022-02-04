import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    urlID: String,
    originalUrl: String,
    shortenedUrl: String
});
