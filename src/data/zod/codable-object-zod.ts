import { AnyZodObject } from "zod"

// Foundation Types

export type RawObject = object
export type UUID = string

export type StaticImplements<I extends new (...args: any[]) => any, C extends I> = InstanceType<I>

export type ObjectType<T> = new (...args: any[]) => T
export type SchematicObjectType<T> = ObjectType<T> & { schema: AnyZodObject }
export type PropertiesObjectType<T, P> = new (properties: P) => T
// export type ObjectPropertiesType<T extends ObjectType<CodableObject>> = ConstructorParameters<T>[0]

// Codable Object

// export abstract class CodableObject {
// 	public static get schema(): AnyZodObject {
// 		throw new TypeError("Schematic object type must return a schema.")
// 	}

// 	public get schema(): AnyZodObject {
// 		const type = this.constructor as typeof CodableObject
// 		return type.schema
// 	}
// }

export interface SchematicObject<T> extends ObjectType<T> {
	readonly schema: AnyZodObject
}

// Encoding

export function encodeObject<T>(objectType: SchematicObjectType<T>, object: T): string {
	// const rawObject = objectType.schema.
	// return JSON.stringify(rawObject)
	throw new Error("Not implemented.")
}

// Decoding

export function decodeObject<T>(ObjectType: SchematicObjectType<T>, data: string): T {
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
