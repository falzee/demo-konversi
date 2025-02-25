const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectMongoDB } = require('../connections/mongodb');
const crypto = require('crypto');

const register = async  (req, res) => {
    const { username,email,nomerInduk, password,posisiKuliah,nama,gelar,jenisKelamin,tempatLahir,tanggalLahir,nomorIdentifikasi,angkatan,nomorPonsel,alamat,website,deskripsi } = req.body;
    const db = await connectMongoDB();

    try {
        const usersCollection = db.collection('users');
        const currentDate = new Date();

        // const existingUser = await usersCollection.findOne({ username });

        if (!nomerInduk || !email) {
            return res.status(400).json({success: false, error: "User ID and email are required fields" });
        }

        const existingUser = await usersCollection.findOne({  $or: [
            { nomer_induk: nomerInduk },
            { email: email },
            { nomor_identifikasi: nomorIdentifikasi}
        ] });

        if (existingUser) {
            return res.status(409).json('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (posisiKuliah === "Dosen") {
            role = "dosen";
            // change to code instead? maybe
        } else if (posisiKuliah === "Mahasiswa"){
            role = "mahasiswa";
        } else{
            role = "UNAUTHORIZED HACKER"
        }
        const newUser = await usersCollection.insertOne({ 
            nomer_induk: nomerInduk,
            username,
            email, 
            password: hashedPassword, 
            posisi_kuliah: posisiKuliah,
            role,
            nama,
            gelar,
            jenis_kelamin: jenisKelamin,
            tempat_lahir: tempatLahir,
            tanggal_lahir: tanggalLahir,
            nomor_identifikasi: nomorIdentifikasi,
            angkatan,
            nomor_ponsel: nomorPonsel,
            alamat,
            website,
            deskripsi,
            user_created_date: currentDate
        });
        
        const payload = {
            username: username,
            nomerInduk: nomerInduk,
            email: email,
            nama: nama,
            role: role,
        }
        console.log("payload =" + newUser)
        const secret = process.env.JWT_SECRET;
        const expiresIn = 24 * 60 * 60 * 1; // 1 hour expiration time in seconds
        const token = jwt.sign(payload, secret, { expiresIn });
        res.status(201).json({ data: payload, token, message: 'User Created Successfully' });
    } catch (error) {
        console.error('Error registering user: ' + error.message);
        res.status(500).json({ error: 'Error registering user!' });
    } 
}

const registerAdminBatch = async (req, res) => {
    let users = req.body.users;

    if (!Array.isArray(users)) {
        users = [users];
    }

    const db = await connectMongoDB();

    if (users.length === 0) {
        return res.status(400).json({ success: false, error: "User data is required" });
    }

    try {
        const usersCollection = db.collection('users');
        const seleniumUsersCollection = db.collection('users_selenium');
        const createdUsers = [];
        const existingUsers = [];
        const currentDate = new Date();

        for (const user of users) {
            const { username, email, nomerInduk, password, posisiKuliah, nama, gelar, jenisKelamin, tempatLahir, tanggalLahir, nomorIdentifikasi, angkatan, nomorPonsel, alamat, website, deskripsi } = user;

            if (!nomerInduk || !email) {
                return res.status(400).json({ success: false, error: "User ID and email are required fields" });
            }

            const existingUser = await usersCollection.findOne({
                $or: [
                    { nomer_induk: nomerInduk },
                    { email: email },
                    { nomor_identifikasi: nomorIdentifikasi }
                ]
            });

            if (existingUser) {
                existingUsers.push({ nomerInduk, email });
                continue;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            let role;
            if (posisiKuliah === "Dosen") {
                role = "dosen";
            } else if (posisiKuliah === "Mahasiswa") {
                role = "mahasiswa";
            } else {
                role = "UNAUTHORIZED HACKER";
            }

            await usersCollection.insertOne({
                nomer_induk: nomerInduk,
                username,
                email,
                password: hashedPassword,
                posisi_kuliah: posisiKuliah,
                role,
                nama,
                gelar,
                jenis_kelamin: jenisKelamin,
                tempat_lahir: tempatLahir,
                tanggal_lahir: tanggalLahir,
                nomor_identifikasi: nomorIdentifikasi,
                angkatan,
                nomor_ponsel: nomorPonsel,
                alamat,
                website,
                deskripsi,
                user_created_date: currentDate
            });

            const payload = {
                username: username,
                nomerInduk: nomerInduk,
                email: email,
                nama: nama,
                role: role,
            };

            createdUsers.push(payload);
        }

        const secret = process.env.JWT_SECRET;
        const expiresIn = 24 * 60 * 60 * 1;

        const tokens = createdUsers.map(user => jwt.sign(user, secret, { expiresIn }));

        res.status(201).json({ createdUsers, tokens, existingUsers, message: 'Users processed successfully' });

    } catch (error) {
        console.error('Error registering users: ' + error.message);
        res.status(500).json({ error: 'Error registering users!' });
    }
};


const login =  async (req, res) => {
    const { email,nomerInduk, password} = req.body;
    const db = await connectMongoDB();
    
    if ((!email && !nomerInduk) || !password) {
        return res.status(400).json({ success: false, message: "User informations are required!" });
    }
    
    try {
        const usersCollection = db.collection('users');

        let user;
        if (email) {
            user = await usersCollection.findOne({ email: email });
        } else if (nomerInduk) {
            user = await usersCollection.findOne({ nomer_induk: nomerInduk });
        }
        
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        // console.log("user payload :"+ user)
        const passwordMatch = await bcrypt.compare(password, user.password);
        // console.log(passwordMatch)
        if (passwordMatch) {
            const payload = {
                username: user.username,
                nomerInduk: user.nomer_induk,
                email: user.email,
                nama: user.nama,
                roles: user.role
            }
            
            const secret = process.env.JWT_SECRET;
            
            const expiresIn = 24 * 60 * 60 * 1;//batas expired 1 jam dalam detik (jam,detik,menit,hari) ganti hari/jam selain itu jangan
            
            const token = jwt.sign(payload, secret, {expiresIn: expiresIn})
            
            console.log("[LOGIN DETECTED] " + user.nomer_induk)
            return res.status(200).json({
                data: payload,
                token: token,
                message:'Login Success'
            })
        } else {
            // Passwords don't match
            return res.status(401).json({ success: false, message: "Invalid username or password!" });
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).json({ success: false, message: "An error occurred during login!" });
    } 
}


module.exports = { 
    register,
    login,
    registerAdminBatch,
};