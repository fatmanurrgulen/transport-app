const Ad = require('../models/Ad');
const User = require('../models/User');

const getAds = async (req, res) => {
    try {
        const ads = await Ad.findAll();
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAd = async (req, res) => {
    const { username, adPhoto, adTitle, adDescription, budget, isProduct, productSpecialType, productSpecialDate, productSpecialStartCity, productSpecialEndCity, productSpecialIsElevatorNeeded, productSpecialStartFloor, productSpecialEndFloor, vehicleSpecialLicensePlate, vehicleSpecialType, vehicleSpecialServiceCities } = req.body;
    try {
        const ad = await Ad.create({ username, adPhoto, adTitle, adDescription, budget, isProduct, productSpecialType, productSpecialDate, productSpecialStartCity, productSpecialEndCity, productSpecialIsElevatorNeeded, productSpecialStartFloor, productSpecialEndFloor, vehicleSpecialLicensePlate, vehicleSpecialType, vehicleSpecialServiceCities });
        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAd = async (req, res) => {
    const { id } = req.body;
    try {
        const deleted = await Ad.destroy({ where: { id } });
        if (deleted) {
            const users = await User.findAll();
            for (const user of users) {
                let favoriteAds = user.favoriteAds || [];
                if (favoriteAds.includes(id)) {
                    // ID'yi favoriteAds listesinden çıkar
                    favoriteAds = favoriteAds.filter(adId => adId !== id);
                    // Kullanıcıyı güncelle
                    await User.update({ favoriteAds }, { where: { id: user.id } });
                }
            }
            res.status(200).json({ message: 'Ad deleted successfully and removed from favoriteAds' });
        } else {
            res.status(404).json({ message: 'Ad not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getAds, addAd, deleteAd };
