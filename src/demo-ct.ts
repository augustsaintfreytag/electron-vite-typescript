import "reflect-metadata"
import { v4 as randomUUID } from "uuid"
import { decodeObject, encodeObject, PaperclipFactory, Savefile } from "~/data/class-transformer/savefile-ct"

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

	try {
		const encodedSavefile = encodeObject(savefile)
		const decodedSavefile = decodeObject(Savefile, encodedSavefile)

		// const encodedFactory = encodeObject(factory)
		// const decodedFactory = decodeObject(PaperclipFactory, encodedFactory)

		debugger
	} catch (error) {
		debugger
	}
}
