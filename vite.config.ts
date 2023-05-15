import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/v1": {
				target: "https://openapi.naver.com/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				secure: false,
				ws: true,
			},

			"/api": {
				target: "https://api.qwer.pw",
				changeOrigin: true,
				headers: {
				},
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
	define: {
		__APP_ENV__: process.env.VITE_VERCEL_ENV,
	},
});



