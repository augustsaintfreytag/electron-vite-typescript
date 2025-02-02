// Foundation Types

import { Expose, instanceToPlain, plainToInstance, Transform, Type } from "class-transformer"

export type AnyObject = object
export type RawObject = object
export type UUID = string

export type StaticImplements<I extends new (...args: any[]) => any, C extends I> = InstanceType<I>

export type ObjectType<T> = new (...args: any[]) => T
export type PropertiesObjectType<T, P> = new (properties: P) => T

export type Properties<T, K extends keyof T> = Pick<T, K>
export type PropertiesWithDefaults<T, K extends keyof T, O extends keyof T> = Pick<T, K> & Partial<Pick<T, O>>
export type PropertiesWithAllDefaults<T, K extends keyof T> = Partial<Pick<T, K>>

// Savefile

export class Savefile {
	// Properties

	@Expose()
	public id: UUID

	@Expose()
	public playerName: string

	@Expose()
	public numberOfPaperclips?: number

	@Expose()
	@Type(() => PaperclipFactory)
	public factories: PaperclipFactory[]

	// Init

	constructor(
		properties: PropertiesWithDefaults<Savefile, "id" | "playerName" | "numberOfPaperclips" | "factories", "numberOfPaperclips" | "factories">
	) {
		this.id = properties?.id
		this.playerName = properties?.playerName
		this.numberOfPaperclips = properties?.numberOfPaperclips ?? 0
		this.factories = properties?.factories ?? []
	}
}

// Paperclip Factory

export class PaperclipFactory {
	// Properties

	@Expose()
	public id: UUID

	@Expose()
	public name: string

	@Expose()
	@Type(() => Map)
	@Transform(({ value }) => (value as Map<unknown, unknown>).toEntries(), { toPlainOnly: true })
	@Transform(({ value }) => new Map(value as [unknown, unknown][]), { toClassOnly: true })
	public productionPerDay: Map<number, number>

	@Expose()
	@Type(() => Set)
	public tags: Set<string>

	// Init

	constructor(properties: PropertiesWithDefaults<PaperclipFactory, "id" | "name" | "productionPerDay" | "tags", "productionPerDay" | "tags">) {
		this.id = properties?.id
		this.name = properties?.name
		this.productionPerDay = properties?.productionPerDay ?? new Map()
		this.tags = properties?.tags ?? new Set()
	}

	public get averageProductionPerDay(): number {
		const numberOfProductions = this.productionPerDay.toValues().reduce((sum, production) => sum + production, 0)
		return numberOfProductions / this.productionPerDay.size
	}
}

// Coding

export function encodeObject<T extends AnyObject>(object: T): string {
	const rawObject = instanceToPlain(object, { excludeExtraneousValues: true })
	return JSON.stringify(rawObject)
}

export function decodeObject<T extends AnyObject>(ObjectType: ObjectType<T>, encodedValue: string): T {
	const rawObject = JSON.parse(encodedValue)
	return plainToInstance(ObjectType, rawObject, { excludeExtraneousValues: true })
}
