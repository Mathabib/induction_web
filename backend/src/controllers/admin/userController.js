const {PrismaClient} = require ('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

//create user
const createUser = async (req, res) => {
    const { username, email, password, position, role } = req.body;
    // const adminId = req.user.id;

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

    try {

        const hashed = await bcrypt.hash(password, 10); //angka 10 ini tingkat kerumitan hashnya
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashed,
                position,
                role,
            },
        });
        res.status(201).json(user);
    }catch (error) {
    console.error(error); // log di server supaya kamu tahu detail errornya
    res.status(500).json({ 
        message: 'Error creating user', 
        error: error.message || error.toString() 
    });
}

};


//get all users


const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      }
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
}



//update user
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { username, email, password, position, role } = req.body;

    try {
        const updated = await prisma.user.update({
            where: { id },
            data: { username, email, password, position, role }
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
}

//delete user
const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        await prisma.user.delete({ where: { id } });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};