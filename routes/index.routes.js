const express = require('express');
const chatModel = require('../models/chat.model');

const router = express.Router();

// ----------------- Render index.ejs -----------------
router.get('/index', (req, res) => {
    res.render('index');
});

// ----------------- Send a new message -----------------
router.post('/index', async (req, res) => {
    try {
        const { from, to, text } = req.body;

        if (!from || !to || !text) {
            return res.status(400).json({ error: "from, to, and text are required" });
        }

        await chatModel.create({ from, to, text });

        res.status(201).json({ message: "Message sent!" });

    } catch (err) {
        console.error(err);
        res.status(500).send("Error sending message");
    }
});

// ----------------- Fetch chat history (polling API) -----------------
router.get('/chat/:user1/:user2', async (req, res) => {
    try {
        const { user1, user2 } = req.params;

        const messages = await chatModel.find({
            $or: [
                { from: user1, to: user2 },
                { from: user2, to: user1 }
            ]
        }).sort({ timestamp: 1 }); // ascending order

        res.json(messages);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching messages");
    }
});

module.exports = router;
