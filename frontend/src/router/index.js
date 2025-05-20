import { createRouter, createWebHistory } from 'vue-router';

// import HomeView from '../views/HomeView.vue';
import StaffView from '../views/StaffView.vue';

const routes = [
    {path: '/', name: 'home', component: StaffView},
    {path: '/staff', name: 'staff', component: StaffView}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;