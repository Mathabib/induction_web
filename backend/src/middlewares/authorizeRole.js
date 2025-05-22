
//middleware untuk membatasi akses berdasarkan role
const authorizeRole = (allowedRoles = []) => {
      // allowedRoles adalah array berisi role yang diizinkan akses ( ['admin', 'staff'])
    return (req, res, next) => {
         // Cek apakah role user yang sedang login (tersimpan di req.user.role) termasuk dalam daftar yang diizinkan
        if (!allowedRoles.includes(req.user.role)) {
             // Kalau role tidak diizinkan, balas dengan status 403 (Forbidden)
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};

module.exports = authorizeRole;