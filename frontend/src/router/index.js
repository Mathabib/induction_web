import { createRouter, createWebHistory } from 'vue-router';
// VUE ROUTER HARUS DI INSTALL DULU !!! npm install vue-router@4
// import HomeView from '../views/HomeView.vue';
import StaffView from '../views/StaffView.vue';

// STAFF VIEW ITU VIEW HALAMAN NYA, JADI ADA VIEW HALMAAN, ADA JUGA KOMPONEN, 
// staffView ITU PAGE StaffView maksudnya
// HOME BELOM ADA

//liat /views/StaffView.vue
const routes = [
    {path: '/', name: 'home', component: StaffView},
    {path: '/staff', name: 'staff', component: StaffView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;