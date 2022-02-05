import express from 'express';
import cryptoRandomString from 'crypto-random-string';
import urlModel from '../models/urlModel.js';
import validUrl from 'valid-url';

const router = express.Router();

const baseUrl = 'https://akom.me/';

router.post('/shorten-url', async (req, res) => {
    const { originalUrl } = req.body;

    if (!validUrl.isUri(originalUrl)) {
        res.status(400).json({ error: 'Invalid URL' });
    }

    const randomSlug = cryptoRandomString({ length: 6, type: 'url-friendly' });

    if (validUrl.isUri(originalUrl)) {
        try {
            let url = await urlModel.findOne({ originalUrl });

            if (url) {
                res.status(200).json({
                    originalUrl,
                    shortenedUrl: baseUrl + url.shortenedUrl
                });
            } else {
                url = new urlModel({
                    originalUrl,
                    shortenedUrl: randomSlug
                });

                await url.save();

                res.status(200).json({
                    originalUrl,
                    shortenedUrl: baseUrl + url.shortenedUrl
                });
            }
        } catch {
            res.status(500).json({ error: 'Server error' });
        }
    } else {
        res.status(401).json({ error: 'Invalid URL' });
    }
});

export default router;