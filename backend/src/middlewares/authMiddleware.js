// Import library jsonwebtoken untuk menangani token
const jwt = require('jsonwebtoken');
// Ambil SECRET_KEY dari environment variable (.env), atau pakai default 'rahasia'
const SECRET_KEY = process.env.SECRET_KEY || 'rahasia';

// Middleware auth untuk mengecek apakah user sudah login
const auth = (req, res, next) => {
    // Ambil header authorization dari request
    const auth = req.headers.authorization;

    // Cek apakah header Authorization ada dan dimulai dengan 'Bearer '
    // Format token yang benar adalah: Bearer <token>
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' }); //klaau tidak ada token, maka kirimkan status 401 Unauthorized
    }

    try {
         // Pisahkan string "Bearer" dan ambil token-nya saja
        const token = auth.split(' ')[1];

        // Verifikasi token dengan SECRET_KEY
        // Kalau token valid, hasilnya adalah payload token (isi data user yang dikirim saat login)
        const decoded = jwt.verify(token, SECRET_KEY);

        // Simpan data user ke request untuk digunakan di route selanjutnya
        req.user = decoded;
        next();

        
    } catch (err) {
        // Kalau token invalid atau expired, kirim error 401 (unauthorized)
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;