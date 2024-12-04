import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path'; // Import resolve for path aliasing
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 3000
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // Set up the alias to point to the src directory
        },
    },
});
