<template>
    <div>
        <h1>Staff List</h1>
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
    import StaffForm from '../components/StaffForm.vue';
    import { getAllStaff } from '../services/staffService';

    const staffList = ref([]);

    const fetchStaff = async () => {
        staffList.value = await getAllStaff();
    };

    onMounted(fetchStaff);
</script>