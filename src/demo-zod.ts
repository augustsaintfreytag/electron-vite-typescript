import { v4 as randomUUID } from "uuid"
import { decodeObject, encodeObject, Savefile } from "~/data/zod/savefile-zod"

export function demo() {
	const savefile = new Savefile({
		id: randomUUID(),
		playerName: "Saint",
		numberOfPaperclips: 0
	})

	debugger

	const encodedSavefile = encodeObject(savefile)
	const decodedSavefile = decodeObject(Savefile, encodedSavefile)

	debugger
}
