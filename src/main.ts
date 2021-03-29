import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createWebHistory, createRouter } from 'vue-router';
import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from '@/App.vue'
import './index.css'

const routes = setupLayouts(generatedRoutes)

const i18n = createI18n({
    locale: 'en',
    messages
})

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(i18n).use(router).mount('#app')
