import mongoose from 'mongoose';
//add config file dotenv with import
import 'dotenv/config';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
module.exports = connection;