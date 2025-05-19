const { prismaclient } = require('@prisma/client');
const prisma = new prismaclient();

module.exports = prisma.staff;