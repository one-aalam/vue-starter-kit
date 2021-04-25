import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'vite-plugin-components'
import ViteFonts from 'vite-plugin-fonts'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import { VitePWA } from 'vite-plugin-pwa'
import Restart from 'vite-plugin-restart'
import replace from '@rollup/plugin-replace'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import EslintPlugin from 'vite-plugin-eslint'
import viteSSR from 'vite-ssr/plugin'
import getPageProps from './serverless/api/get-page-props'
import getPage from './serverless/api/get-page'

const configureDevSeverPlugin = () => ({
    name: 'configure-server',
    configureServer(server) {
        server.middlewares.use('/api/get-page-props', getPageProps)
        server.middlewares.use('/api/get-page', getPage)
    //   server.middlewares.use((req, res, next) => {
    //     // custom handle request...
    //   })
    }
})

// https://github.com/frandiox/vitesse-ssr-template/blob/master/vite.config.ts
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    viteSSR(),
    configureDevSeverPlugin(),
    Vue(),
    Pages({
      pagesDir: [{ dir: 'src/pages', baseRoute: '' }],
      extensions: ['vue'],
      syncIndex: false,
      replaceSquareBrackets: true,
    }),
    Layouts(),
    // EslintPlugin(),
    ViteFonts({
      google: {
        families: ['Source Sans Pro'],
      },
    }),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    VitePWA({
      base: '/',
      registerType: process.env.CLAIMS === 'true' ? 'autoUpdate' : undefined,
      manifest: {
        name: 'vue-starter-kit',
        short_name: 'vsk',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    VueI18n({
      include: [path.resolve(__dirname, 'locales/**')],
    //   include: [path.resolve(__dirname, 'src/i18n/translations/**')],
    }),
    Restart({
      restart: ['../../dist/*.js'],
    }),
    replace({
      __DATE__: new Date().toISOString(),
      preventAssignment: true,
    }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: [ 'vue-demi' ],
  },
})
