import HomePage from './components/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'



const routes = [
    {
        name: 'Home',
        component: HomePage,
        path: '/'
    },
  
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router