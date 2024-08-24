const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); // Veritabanı bağlantısı
const cors = require('cors'); // CORS middleware'ini içeri aktarın

// Rota dosyaları
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // CORS middleware'ini kullanın
app.use(bodyParser.json());

// Rotalar
app.use('/users', userRoutes);
app.use('/ads', adRoutes);
app.use('/messages', messageRoutes);

// Veritabanı bağlantısı ve sunucunun başlatılması
sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Unable to sync the database:', error);
    });
