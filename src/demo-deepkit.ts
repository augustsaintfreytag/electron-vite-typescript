import { cast, integer, ReceiveType, serialize, UUID } from "@deepkit/type"
import { v4 as randomUUID } from "uuid"
import { makeDemoSavefile } from "~/data/deepkit/savefile-data-provider-deepkit"
import { Savefile } from "~/data/deepkit/savefile-deepkit"

function deserializeModelFromRaw<Type extends CodableObject>(rawObject: object, type?: ReceiveType<Type>): Type | undefined {
	return cast<Type>(rawObject)
}

function deserializeAssetFromRaw<Data>(rawObject: object, type?: ReceiveType<Data>): Asset<Data> | undefined {
	return cast<Asset<Data>>(rawObject)
}

class CodableObject {
	public id: UUID

	constructor(id: UUID = randomUUID()) {
		this.id = id
	}
}

class Asset<Data> extends CodableObject {
	public data: Data

	constructor(data: Data) {
		super()
		this.data = data
	}
}

class PaperclipVendor extends CodableObject {
	public name: string
	public recruitmentYear: integer

	constructor(name: string, recruitmentYear: integer) {
		super()

		this.name = name
		this.recruitmentYear = recruitmentYear
	}
}

export const demo = __1__demo

export function __1__demo() {
	const vendor = new PaperclipVendor("Millner Eglund", 1991)
	const vendorAsset = new Asset<PaperclipVendor>(vendor)

	const encodedObject = serialize<Asset<PaperclipVendor>>(vendorAsset)
	const encodedData = JSON.stringify(encodedObject)
	const decodedObject = JSON.parse(encodedData)

	const decodedDataAsFull = deserializeModelFromRaw<Asset<PaperclipVendor>>(decodedObject)
	const decodedDataAsAsset = deserializeAssetFromRaw<PaperclipVendor>(decodedObject)

	debugger
}

export function __2__demo() {
	const savefile = makeDemoSavefile()

	const encodedSavefileObject = serialize<Savefile>(savefile)
	const encodedSavefileData = JSON.stringify(encodedSavefileObject)
	const decodedSaveFileObject = JSON.parse(encodedSavefileData)
	const decodedSaveFile = deserializeModelFromRaw<Savefile>(decodedSaveFileObject)

	debugger
}
