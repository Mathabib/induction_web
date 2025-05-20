


<template>
    <!-- KOMPONEN INI YANG MENGGUNAKAN function createStaff -->

    <form @submit.prevent="handleSubmit" class="space-y-2">
        <input v-model="name" placeholder="name">
        <input v-model="email" placeholder="email">
        <input v-model="position" placeholder="position">
        <button type="submit">Add Staff</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { createStaff } from '../services/staffService';

const emit = defineEmits(['submitted']);

const name = ref('');
const email = ref('');
const position = ref('');

const handleSubmit = async () => {
    // PAREMETER createStaff() cuman satu DISINI KITA MASUKAN SEBUAH OBJEK
    // NAMANYA BESAR KECIL HURUFNYA HARUS SAMA SEPERTI YANG ADA DIDATABASE YA
    // Position: beda sama position:
    await createStaff({
        name: name.value,
        email: email.value,
        Position: position.value
    });

    name.value = '';
    email.value = '';
    position.value = '';

    emit('submitted');
}
</script>