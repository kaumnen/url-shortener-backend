import express from 'express';
import { urlModel } from '../models/urlModel.js';

const router = express.Router();

router.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const url = await urlModel.findOne({ shortenedUrl: code });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'Not found' });
        }
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;