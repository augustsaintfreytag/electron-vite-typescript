import { serialize, integer, UUID, deserialize, deserializeType, ReceiveType } from "@deepkit/type"
import { v4 as randomUUID } from "uuid"
import { makeDemoSavefile, Savefile } from "~/data-provider"

function deserializeModelFromRaw<Type>(rawObject: object, type?: ReceiveType<Type>): Type | undefined {
	return deserialize<Type>(rawObject)
}

export function demo() {
	const savefile = makeDemoSavefile()

	const encodedSavefileObject = serialize<Savefile>(savefile)
	const encodedSavefileData = JSON.stringify(encodedSavefileObject)
	const decodedSaveFileObject = JSON.parse(encodedSavefileData)
	const decodedSaveFile = deserializeModelFromRaw<Savefile>(encodedSavefileObject)

	debugger
}
