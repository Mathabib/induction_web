<template>
    <div>
        <h1>Staff List</h1>
        <!-- ini manggil component StaffForm yanga da di components/StaffForm.vue, -->
         <!-- TAPI HARUS DIIMPORT DULU DIBAGIAN <script></script> dibawah ini -->

        <StaffForm @submitted="fetchStaff" />
        <ul>
            <li v-for="staff in staffList" :key="staff.id">
                {{ staff.name }} - {{ staff.email }} ({{ staff.position }})
            </li>
        </ul>
    </div>
</template>

<!-- WAJIB HUKUMNYA SCRIPT ITU DITAMBAHIN "setup" KALAU GAK KAGAK JALAN SCRIPT NYA -->
<script setup>
    import { ref, onMounted } from 'vue';
    // INI NGAMBIL KOMPONEN SUPAYA BISA DIPANGGIL
    import StaffForm from '../components/StaffForm.vue';
    import { getAllStaff } from '../services/staffService';

    const staffList = ref([]);

    // INI FUNGSI UNTUK NGAMBIL DATA, SEBELUM PAKAI IMPORT DULU
    // DARI /services/staffService.js
    const fetchStaff = async () => {
        staffList.value = await getAllStaff();
    };

    // Begitu komponen dimuat, langsung jalankan fungsi fetchStaff()
    //  untuk ambil data staff dari server (dalam hal ini dari getAllStaff()).
    onMounted(fetchStaff);
</script>