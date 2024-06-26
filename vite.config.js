import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/build/' : '/',
    plugins: [
        viteReact(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
});
