export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class TopPageModel {
	firstCategory: TopLevelCategory
	secondCategory: string
	title: string
	category: string
	hh?: {
		count: number
		junSalary: number
		midSalary: number
		seniorSalary: number
	}
	advantages: {
		title: string
		description: string
	}[]
	seoText: string
	tagsTitle: string
	tags: string[]

}
