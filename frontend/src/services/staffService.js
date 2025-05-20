import axios from 'axios';
const API_URL = 'http://localhost:3000/api/staff';

export const getAllStaff = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const createStaff = async (staff) => {
    const res = await axios.post(API_URL, staff);
    return res.data;
};