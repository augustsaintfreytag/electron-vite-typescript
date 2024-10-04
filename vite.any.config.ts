import { defineConfig } from "vite"
import { deepkitType } from "@deepkit/vite"
import { resolve } from "path"
import { ModuleKind } from "typescript"
import commonJS from "@rollup/plugin-commonjs"

// https://vitejs.dev/config
export default defineConfig({
	plugins: [
		deepkitType({
			compilerOptions: {
				module: ModuleKind.ESNext
			}
		}),
		commonJS({
			transformMixedEsModules: true
		})
	],
	resolve: {
		alias: {
			"~": resolve(__dirname, "src")
		}
	}
})
