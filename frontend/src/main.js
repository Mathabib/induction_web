import { createApp } from 'vue'
import './style.css'
import router from './router';
import App from './App.vue'

// createApp(App).mount('#app')

// BUAT MANGGIL APP.VUE , FILE VUE JS UTAMA NANTI SEMUANYA DI LOAD DISITU
createApp(App).use(router).mount('#app');
