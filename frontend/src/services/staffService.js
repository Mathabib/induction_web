
// INI KAYAK CONTROLLER DARI SISI FRONT END ISINYA AXIOS atau yang sejenisnya 
// seperti fetch AJAX dan lain lain 

// DISINI FUNGSINYA UNTUK MEMANGGIL API, MENGIRIM REQUEST DAN MENERIMA RESPONSE
// SEJAUH INI CUMAN BUAT AMBIL DAN KIRIM DATA AJA, GET DAN POST YA BARU TAU GITU DOANG
//

import axios from 'axios';
const API_URL = 'http://localhost:3000/api/staff';

export const getAllStaff = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

// INI SAMA AJA KAYAK  createStaff(staff){} KITA KASIH 1 PARAMETER
export const createStaff = async (staff) => {
    const res = await axios.post(API_URL, staff);
    return res.data;
};