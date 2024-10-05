import { v4 as randomUUID } from "uuid"

class Savefile {
	constructor(public numberOfPaperclips: number, public factories: PaperclipFactory[]) {}
}

class PaperclipFactory {
	constructor(public id: string, public name: string, public productionPerDay: number) {}
}

export function demo() {
	const savefile = new Savefile(412_000, [
		new PaperclipFactory(randomUUID(), "Poland 01", 1_000),
		new PaperclipFactory(randomUUID(), "Poland 02", 1_800),
		new PaperclipFactory(randomUUID(), "Latvia 01", 800)
	])

	// const encodedSavefile = serialize<Savefile>(savefile)
	debugger
}
