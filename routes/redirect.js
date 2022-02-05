import express from 'express';
import { Url } from '../models/urlModel';

const router = express.Router();

router.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
        const url = await Url.findOne({ shortenedUrl: code });
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