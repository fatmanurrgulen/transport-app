const User = require('../models/User');

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkUserPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && user.password === password) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateFavoriteAds = async (req, res) => {
    const { username } = req.params;
    const { favoriteAds } = req.body; // Array of favorite ad IDs

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            user.favoriteAds = favoriteAds; // Update favoriteAds field
            await user.save(); // Save changes
            res.status(200).json({ message: 'Favorite ads updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getFavoriteAds = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ where: { username } });
        if (user) {
            const favoriteAds = user.favoriteAds;
            res.status(200).json({ favoriteAds });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createUser, checkUserPassword, updateFavoriteAds, getFavoriteAds };
