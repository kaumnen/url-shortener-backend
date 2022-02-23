import express from 'express';
import cryptoRandomString from 'crypto-random-string';
import { urlModel } from '../models/urlModel.js';
import validUrl from 'valid-url';
import 'dotenv/config';

const router = express.Router();

const baseUrl = process.env.BASE_URL;

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;

    if (!validUrl.isUri(originalUrl)) {
         return res.status(400).json({ error: 'Invalid URL' });
    }

    const randomSlug = cryptoRandomString({ length: 5, type: 'url-safe' });

    if (validUrl.isUri(originalUrl)) {
        try {
            let url = await urlModel.findOne({ originalUrl });

            if (url) {
                return res.status(200).json({
                    originalUrl,
                    shortenedUrl: baseUrl + '/' + url.shortenedUrl
                });
            } else {
                url = new urlModel({
                    originalUrl,
                    shortenedUrl: randomSlug
                });

                await url.save();

                return res.status(200).json({
                    originalUrl,
                    shortenedUrl: baseUrl + '/' + url.shortenedUrl
                });
            }
        } catch {
            return res.status(500).json({ error: 'Server error' });
        }
    } else {
        return res.status(401).json({ error: 'Invalid URL' });
    }
});

export default router;