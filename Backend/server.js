const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const formRoutes = require('./routes/formRoutes');
const userRoutes = require('./routes/userRoutes')
const adminFormRoutes = require('./routes/adminFormRoutes')

require('dotenv').config();

const app = express();
const PORT_SERVER = process.env.PORT_SERVER;


// RULE SPASI PENAMAAN
// (-) => buat api,(_) => buat database,
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth',authRoutes);
app.use('/form-penilaian',formRoutes);
app.use('/user',userRoutes)
app.use('/form-tools',adminFormRoutes)
app.post('/mqtt',(req, res) => {
    const { topic, message } = req.body;

    // Publish message
    client.publish(topic, message, function (err) {
        if (err) {
            console.error('Error publishing message:', err);
            res.status(500).json({ error: 'Error publishing message' });
        } else {
            console.log('Message published successfully');
            res.json({ message: 'Message published successfully' });
        }
    });
});
app.get('/', (req, res) => {
    res.send("Server is running...");
});

app.listen(PORT_SERVER, () => {
    console.log(`Server is running on port ${PORT_SERVER}`);
})

// jwt mending (local/session) storage/cookies?
// koneksi user ke form website gimana?
// RULE ===
// ADMIN = GOD MODE
// DOSEN = baca dan edit mhs yg diberi penilaian dan tentunya data dosen sendiri (bebas terbatas)
// MHS = baca nilai sendiri dan edit nilai sendiri (hampir private)
// YG PERLU ADA DI DB buat CRUD
// 1. user 
// 2. nilai + matkulnya
// 3. CPMK
// 4. isi form (contoh. W berapa aja di dalem form I berapa oleh siapa)