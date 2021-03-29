import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router';
import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from '@/App.vue'
import './index.css'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
