import { AnyZodObject, z } from "zod"

type RawObject = object
type UUID = string

type ObjectType<T> = new (...args: any[]) => T
type SchematicObjectType<T> = (new (...args: any[]) => T) & { schema: AnyZodObject }
type PropertiesObjectType<T, P> = new (properties: P) => T
type ObjectPropertiesType<T extends ObjectType<CodableObject>> = ConstructorParameters<T>[0]

export abstract class CodableObject {
	static schema: AnyZodObject

	public get schema(): AnyZodObject {
		const type = this.constructor as typeof CodableObject
		return type.schema
	}
}

type SavefilePropertiesType = ObjectPropertiesType<typeof Savefile>

export class Savefile extends CodableObject {
	// Properties

	public id: UUID
	public playerName: string
	public numberOfPaperclips?: number

	// Init

	constructor(properties: { id: UUID; playerName: string; numberOfPaperclips: number | undefined }) {
		super()

		this.id = properties.id
		this.playerName = properties.playerName
		this.numberOfPaperclips = properties.numberOfPaperclips
	}

	// Schema

	public static schema = z.object({
		id: z.string().uuid(),
		playerName: z.string(),
		numberOfPaperclips: z.number().int().optional()
	})
}

// Logic

export function encodeObject<T extends CodableObject>(object: T): string {
	const rawObject = object.schema.parse(object)
	return JSON.stringify(rawObject)
}

export function decodeObject<T extends CodableObject>(ObjectType: SchematicObjectType<T>, data: string): T {
	try {
		// Parse JSON string into a plain object
		const rawObjectStructure = JSON.parse(data)

		// Validate the parsed data against the schema
		const rawObject = ObjectType.schema.parse(rawObjectStructure)

		// Instantiate the object with the validated data
		return new ObjectType(rawObject)
	} catch (error) {
		throw new Error(`Failed to decode object: ${error}`)
	}
}
