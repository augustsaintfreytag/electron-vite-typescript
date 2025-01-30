import { v4 as randomUUID } from "uuid"
import { decodeObject, encodeObject } from "~/data/zod/codable-object-zod"
import { PaperclipFactory, Savefile } from "~/data/zod/savefile-zod"

export function demo() {
	const factory = new PaperclipFactory({
		id: randomUUID(),
		name: "Warsaw Outskirts",
		productionPerDay: new Map([
			[0, 0],
			[1, 171],
			[2, 510],
			[3, 690],
			[4, 674],
			[5, 688]
		]),
		tags: new Set(["Poland", "Warsaw", "Rural"])
	})

	const savefile = new Savefile({
		id: randomUUID(),
		playerName: "Saint",
		numberOfPaperclips: 0,
		factories: [factory]
	})

	// const encodedSavefile = encodeObject(Savefile, savefile)
	// const decodedSavefile = decodeObject(Savefile, encodedSavefile)

	debugger

	const encodedFactory = encodeObject(PaperclipFactory, factory)
	const decodedFactory = decodeObject(PaperclipFactory, encodedFactory)

	debugger
}
