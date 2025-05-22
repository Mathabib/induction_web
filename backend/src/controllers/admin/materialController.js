const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Material
const createMaterial = async (req, res) => {
  const { title, description, video, Image, link } = req.body;
  const adminId = req.user.id;

  try {
    const material = await prisma.material.create({
      data: {
        title,
        description,
        video,
        Image,
        link,
        createdById: adminId,
      },
    });
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Error creating material', error });
  }
};

// Get All Materials
const getAllMaterials = async (req, res) => {
  const materials = await prisma.material.findMany({
    include: { createdBy: true }
  });
  res.json(materials);
};

// Update Material
const updateMaterial = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, videoUrl, link } = req.body;

  try {
    const updated = await prisma.material.update({
      where: { id },
      data: { title, description, videoUrl, link }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating material' });
  }
};

// Delete Material
const deleteMaterial = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.material.delete({ where: { id } });
    res.json({ message: 'Material deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting material' });
  }
};

module.exports = {
  createMaterial,
  getAllMaterials,
  updateMaterial,
  deleteMaterial
};
