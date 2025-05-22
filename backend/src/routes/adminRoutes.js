const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');
const material = require('../controllers/admin/materialController');

const user = require('../controllers/admin/userController');
// const progress = require('../controllers/progressController');

router.use(auth, authorizeRole(['admin']));

router.get('/', (req, res) => {
  const username = req.user.username; // ambil dari decoded JWT token
  res.status(200).json({
    message: `Halo, selamat datang Admin ${username}!`
  });
});

// Material Routes
router.post('/materials', material.createMaterial);
router.get('/materials', material.getAllMaterials);
router.put('/materials/:id', material.updateMaterial);
router.delete('/materials/:id', material.deleteMaterial);

// User Routes
router.post('/users', user.createUser);
router.get('/users', user.getAllUsers);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.deleteUser);

// // Progress Routes
// router.get('/progress', progress.getAllProgress);

module.exports = router;
