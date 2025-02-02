import { deepkitType } from "@deepkit/vite"
import { join as joinPath, resolve as resolvePath } from "path"
import { defineConfig } from "vite"

const projectRoot = resolvePath(__dirname)
const injectDeepKit = false

// https://vitejs.dev/config
export default defineConfig({
	plugins: [
		injectDeepKit &&
			deepkitType({
				tsConfig: joinPath(projectRoot, "tsconfig.deepkit.json"),
				compilerOptions: {
					inlineSourceMap: true
				}
			})
	],
	resolve: {
		alias: {
			"~": joinPath(projectRoot, "src")
		}
	},
	build: {
		sourcemap: "inline"
	}
})
