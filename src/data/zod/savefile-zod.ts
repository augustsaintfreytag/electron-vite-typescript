import { z } from "zod"
import { SchematicObject, StaticImplements, UUID } from "~/data/zod/codable-object-zod"

// function mapEncodingTransform

// Paperclip Factory

export class PaperclipFactory implements StaticImplements<SchematicObject<PaperclipFactory>, typeof PaperclipFactory> {
	// Properties

	public id: UUID
	public name: string
	public productionPerDay: Map<number, number>
	public tags: Set<string>

	// Init

	constructor(properties: Pick<PaperclipFactory, "id" | "name" | "productionPerDay" | "tags">) {
		this.id = properties.id
		this.name = properties.name
		this.productionPerDay = properties.productionPerDay
		this.tags = properties.tags
	}

	public get averageProductionPerDay(): number {
		return Array.from(this.productionPerDay.values()).reduce((sum, production) => sum + production, 0) / this.productionPerDay.size
	}

	// Schema

	public static readonly schema = z.object({
		id: z.string().uuid(),
		name: z.string(),
		productionPerDay: z.map(z.number(), z.number()).transform(value => Array.from(value.entries())),
		tags: z.set(z.string()).transform(value => Array.from(value.values()))
	})
}

// Savefile

export class Savefile implements StaticImplements<SchematicObject<Savefile>, typeof Savefile> {
	// Properties

	public id: UUID
	public playerName: string
	public numberOfPaperclips?: number
	public factories: PaperclipFactory[]

	// Init

	constructor(properties: Pick<Savefile, "id" | "playerName" | "numberOfPaperclips" | "factories">) {
		this.id = properties.id
		this.playerName = properties.playerName
		this.numberOfPaperclips = properties.numberOfPaperclips
		this.factories = properties.factories
	}

	// Schema

	public static readonly schema = z.object({
		id: z.string().uuid(),
		playerName: z.string(),
		numberOfPaperclips: z.number().int().optional(),
		factories: z.array(PaperclipFactory.schema)
	})
}
