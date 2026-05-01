export function getWeekStart(offset: number): string {
	const date = new Date()
	const day = date.getDay()
	const daysToMonday = day === 0 ? -6 : 1 - day
	date.setDate(date.getDate() + daysToMonday + offset * 7)
	return date.toISOString().split('T')[0]
}
