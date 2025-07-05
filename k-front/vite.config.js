import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src/components', import.meta.url)),
			'~': fileURLToPath(new URL('./', import.meta.url)),
		}
	},
	server: { port: 3001 },
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "~/src/assets/scss/_mixins.scss" as *;
					@use "~/src/assets/scss/_fonts.scss" as *;
					@use "~/src/assets/scss/_variables.scss" as *;
				`,
				api: 'modern-compiler'
		}
		}
	},
})
