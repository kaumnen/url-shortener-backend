import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    urlID: String,
    originalUrl: String,
    shortenedUrl: String
});

const urlModel = mongoose.model('Url', urlSchema);

export { urlModel };