const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllStaff = async () => {
    return await prisma.staff.findMany();
};

exports.createStaff = async (data) => {
    return await prisma.staff.create({ data });
};