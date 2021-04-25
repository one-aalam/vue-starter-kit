import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'
import viteSSR, { ClientOnly } from 'vite-ssr'
import type{ } from 'vite-ssr'
import { RouteLocation } from 'vue-router'
import { createHead } from '@vueuse/head'
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from '@/lib/i18n'
import App from '@/App.vue'
import './index.css'

const routes = setupLayouts(generatedRoutes)

export default viteSSR(
    App, {
        routes,
            // Use Router's base for i18n routes
        base: ({ url }) => {
            const locale = extractLocaleFromPath(url.pathname)
            return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
        },
    }, async (context) => {

        // install all modules under `modules/`
        Object.values(
            import.meta.globEager('./modules/*.ts')).map(
                (module) => module.install?.(context)
            )

        const { app, url, router, isClient, initialState, initialRoute } = context

        // Use common plug-ins
        const head = createHead()
        app.use(head)

        // Register common components
        app.component(ClientOnly.name, ClientOnly)

        // Load language asyncrhonously to avoid bundling all languages
        await installI18n(app, extractLocaleFromPath(initialRoute.href))

        // Freely modify initialState and it will be serialized later
        if (import.meta.env.SSR) {
            initialState.app = {
                name: 'Vite Starter Kit'
            }
            // This object can be passed to Vuex store
        } else {
            // In browser, initialState will be hydrated with data from SSR
            console.log('Initial state:', initialState)
        }


        router.beforeEach(async (to: RouteLocation, from: RouteLocation, next: () => {}) => {
            // You're on the server-side, not running in the development mode and already having a state populated
            if (!!to.meta.state && (!import.meta.env.DEV || import.meta.env.SSR)) {
                return next()
            }

            const baseUrl = isClient ? '' : url.origin // `isClient` - do things on the client-side (non tree-shakeable)

            // first run is on the server, subsequent runs are on the client-side
            try {
                // Get our page props from our custom API:
                const res = await fetch(`${baseUrl}/api/get-page-props?path=${encodeURIComponent(to.path)}&name=${String(to.name)}&client=${isClient}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                const state = await res.json()
                to.meta.state = state // During SSR, this is the same as modifying initialState
            } catch (error) {
                console.error(error)
                // redirect to error route conditionally
            }
            next()
      })

      return { head }
})
