import { defineConfig } from "vite"
import { deepkitType } from "@deepkit/vite"
import { resolve as resolvePath, join as joinPath } from "path"

const projectRoot = resolvePath(__dirname)

// https://vitejs.dev/config
export default defineConfig({
	plugins: [
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
