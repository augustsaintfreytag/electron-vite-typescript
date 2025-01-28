import { integer, UUID } from "@deepkit/type"

export class Savefile {
	constructor(public id: UUID, public numberOfPaperclips: integer, public factories: PaperclipFactory[]) {}
}

export class PaperclipFactory {
	constructor(public id: string, public name: string, public productionPerDay: Map<integer, integer>, public tags: Set<string>) {}

	public get averageProductionPerDay(): integer {
		return Array.from(this.productionPerDay.values()).reduce((sum, production) => sum + production, 0) / this.productionPerDay.size
	}
}
