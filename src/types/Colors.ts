export interface IColors {
	id: number
	name: string
	year: number
	color: string
	pantone_value: string
}

export interface IData {
	page: number
	per_page: number
	total: number
	total_pages: number
	errorMessage: string | undefined
	data: IColors[]
	allColorsData: IColors[]
}
