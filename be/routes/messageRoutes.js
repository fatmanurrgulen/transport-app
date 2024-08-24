const express = require('express');
const { checkMessage, getMessages, sendMessage, updateMessagesReadTrue } = require('../controllers/messageController');

const router = express.Router();

router.get('/check/:id', checkMessage);
router.get('/:senderId/:receiverId', getMessages);
router.post('/send', sendMessage);
router.post('/updateMessagesReadTrue/:id', updateMessagesReadTrue);


module.exports = router;
