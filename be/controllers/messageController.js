const Message = require('../models/Message');
const { Op } = require('sequelize');

const checkMessage = async (req, res) => {
    const { id } = req.params;
    try {
        const unreadMessages = await Message.count({ where: { receiver: id, isRead: false } });
        const incomingMessagesFrom = await Message.findAll({
            where: { receiver: id },
            attributes: [[Message.sequelize.fn('DISTINCT', Message.sequelize.col('sender')), 'sender']]
        });
        const outgoingMessagesFrom = await Message.findAll({
            where: { sender: id },
            attributes: [[Message.sequelize.fn('DISTINCT', Message.sequelize.col('receiver')), 'receiver']]
        });
        res.status(200).json({ unreadMessages: unreadMessages > 0 , incomingMessagesFrom: incomingMessagesFrom, outgoingMessagesFrom: outgoingMessagesFrom});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    const { senderId, receiverId } = req.params;
    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId }
                ]
            },
            order: [['date', 'ASC']]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendMessage = async (req, res) => {
    const { sender, receiver, message } = req.body;
    try {
        const newMessage = await Message.create({ sender, receiver, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMessagesReadTrue = async (req, res) => {
    const { id } = req.params;
    try {
        await Message.update(
            { isRead: true },
            { where: { receiver: id, isRead: false } }
        );
        res.status(200).json({ message: 'Messages updated to read' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { checkMessage, getMessages, sendMessage, updateMessagesReadTrue };
