import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class HhData {
	@prop()
	count: number

	@prop()
	junSalary: number

	@prop()
	midSalary: number

	@prop()
	seniorSalary: number
}

export class TopPageAdvantage {
	@prop()
	title: string

	@prop()
	description: string
}

export interface TopPageModel extends Base { }
export class TopPageModel extends TimeStamps {

	@prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory

	@prop()
	secondCategory: string

	@prop()
	aliases: string

	@prop()
	title: string

	@prop()
	category: string

	@prop({ type: () => [HhData] })
	hh?: HhData

	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[]

	@prop()
	seoText: string

	@prop()
	tagsTitle: string

	@prop({ type: () => [String] })
	tags: string[]
}
