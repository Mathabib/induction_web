import { createRouter, createWebHistory } from 'vue-router';
import StaffView from '../views/StaffView.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Users from '../views/Admin/Users.vue'; // import komponen Users

const routes = [
  { path: '/', redirect: '/login' },        // root langsung ke login
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/staff', component: StaffView, name: 'staff' },
  {
    path: '/admin/users',
    component: Users,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard untuk cek token dan role
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!token) return next('/login');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (to.meta.requiresAdmin && payload.role !== 'admin') {
        return next('/login'); // kalau bukan admin, redirect login atau halaman lain
      }
      next();
    } catch (error) {
      console.error('Invalid token:', error);
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
