import DetailGame from '@/pages/DetailGame.vue';
import Favorite from '@/pages/Favorite.vue';
import Home from '@/pages/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: Home },
    { path: '/favorite', component: Favorite },
    { path: '/detail/:id', component: DetailGame, props: true }
];

const router = createRouter({
    history: createWebHistory(), // Gunakan HTML5 History API
    routes,
});
  
export default router;