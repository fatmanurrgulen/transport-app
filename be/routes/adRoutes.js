const express = require('express');
const { getAds, addAd, deleteAd} = require('../controllers/adController');

const router = express.Router();

router.get('/', getAds);
router.post('/add', addAd);
router.delete('/', deleteAd);

module.exports = router;
