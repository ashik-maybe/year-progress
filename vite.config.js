import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/year-progress/',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icons/apple-touch-icon.png'],
            manifest: {
                name: 'Year Progress',
                short_name: 'Year Progress',
                description: 'See how far the current year has progressed.',
                start_url: '/year-progress/',
                scope: '/year-progress/',
                display: 'standalone',
                background_color: '#e4e7ec',
                theme_color: '#e4e7ec',
                icons: [
                    {
                        src: '/year-progress/icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/year-progress/icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/year-progress/icons/icon-maskable-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            },
            workbox: {
                navigateFallback: '/year-progress/index.html'
            }
        })
    ]
})
