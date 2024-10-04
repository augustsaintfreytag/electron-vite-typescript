// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron"
import path from "path"

contextBridge.exposeInMainWorld("demo", {
	dirname: path.resolve(__dirname)
})
