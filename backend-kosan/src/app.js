const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const kamarRoutes = require('./routes/kamarRoutes');
const penghuniRoutes = require('./routes/penghuniRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/kamar', kamarRoutes);
app.use('/api/penghuni', penghuniRoutes);

app.get('/api/test', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API Sistem Kos-kosan Berjalan Normal!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
