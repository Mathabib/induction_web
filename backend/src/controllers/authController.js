const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'rahasia';



//fungsi ini digunakan untuk mendaftarkan user baru ke database
const register = async (req, res) => {
    const { username,email, password, position } = req.body; //mengambil data username, password dan position dari permintaan(req.body) 

    //mengecek apakah username dan password diisi
    if (!username || !email|| !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    //mengecek apakah username sudah ada didatabase
    const existing = await prisma.user.findUnique({
        where: { username }
    });

     const existingEmail = await prisma.user.findUnique({
        where: { email }
    });

    if (existing) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    
    //hash password sebelum disimpan ke database (biar aman)
    const hashed = await bcrypt.hash(password, 10); //angka 10 ini tingkat kerumitan hashnya

    //simpan user baru ke database
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashed,
            position
            //role default to user
        }
    });

    //mengirim respon, jika user berhasil dibuat
    res.status (201).json({
        message: 'User created successfully',
        user: {
            id: user.id,
            username: user.username,
            position: user.position,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            loginAt: user.loginAt,
        }
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    //mencari user berdasarkan username
    const user = await prisma.user.findUnique({
        where: { username }
    });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    //mengecek password yang dimasukkan dengan password yang ada di database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Update lastLoginAt dengan waktu saat ini
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            lastLoginAt: new Date() // Mengupdate field lastLoginAt dengan waktu sekarang
        }
    });


    //fungsi ini digunakan untuk mendaftarkan user baru ke database
    //membuat token jwt untuk user yang berhasil login
    const token = jwt.sign({ id: updatedUser.id,  username: user.username, role: user.role }, //untuk mendapatkan id, username dan role user
         SECRET_KEY, { expiresIn: '1h' }); //token kadalwaarsa 1 jam
        //mengirimkan token ke client
         res.status(200).json({token});
};
const logout = async (req, res) => {
  // Tidak perlu apa-apa, karena JWT tidak disimpan di server
  res.status(200).json({ message: 'Logged out' });
};


module.exports = {register, login, logout};