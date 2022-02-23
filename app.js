import express from 'express';
import { connection } from './config/db.config.js';
import shortenUrl from './routes/shortenUrl.js';
import redirect from './routes/redirect.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', redirect);
app.use('/api', shortenUrl);

connection.on('open', () => {
    console.log('MongoDB database connection established successfully');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
connection.on('error', () => console.log('MongoDB database connection error'));