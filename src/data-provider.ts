import { integer } from "@deepkit/type"
import { v4 as randomUUID } from "uuid"

export class Savefile {
	constructor(public numberOfPaperclips: integer, public factories: PaperclipFactory[]) {}
}

export class PaperclipFactory {
	constructor(public id: string, public name: string, public productionPerDay: Map<integer, integer>, public tags: Set<string>) {}

	public get averageProductionPerDay(): integer {
		return Array.from(this.productionPerDay.values()).reduce((sum, production) => sum + production, 0) / this.productionPerDay.size
	}
}

export function makeDemoSavefile() {
	const savefile = new Savefile(412_000, [
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
