import { v4 as randomUUID } from "uuid"
import { PaperclipFactory, Savefile } from "~/data/deepkit/savefile-deepkit"

export function makeDemoSavefile() {
	const savefile = new Savefile(randomUUID(), 412_000, [
		new PaperclipFactory(
			randomUUID(),
			"Poland 01",
			new Map([
				[0, 200],
				[1, 220],
				[2, 260]
			]),
			new Set(["establishedFactory", "europeanFactory"])
		),
		new PaperclipFactory(
			randomUUID(),
			"Poland 02",
			new Map([
				[0, 420],
				[1, 390],
				[2, 450]
			]),
			new Set(["newFactory", "europeanFactory"])
		),
		new PaperclipFactory(
			randomUUID(),
			"Latvia 01",
			new Map([
				[0, 180],
				[1, 240],
				[2, 210]
			]),
			new Set(["newFactory", "europeanFactory"])
		)
	])

	return savefile
}
