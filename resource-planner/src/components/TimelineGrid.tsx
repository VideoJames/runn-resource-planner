import type { Person } from '../types/models'
import type { Allocation } from '../types/models'
import AllocationBlock from '../components/AllocationBlock'
import { getWeekStart } from '../lib/dates'


export default function TimelineGrid({people, allocations, weekOffset, capacity, onSelect}: TimelineGridProps){
	const peopleRows = people.map(person => (
		<tr key={person.id}>
			<td>{person.name} - {capacity[person.id] ?? 0}%</td>
			{[0, 1, 2, 3].map(col => {
				const weekStart = getWeekStart(weekOffset + col)
				const weekAllocations = allocations.filter(
					a => a.person.id === person.id && a.week_start_date === weekStart
				)
				return (
					<td key = {col}>
						{weekAllocations.map(allocation => (
							<AllocationBlock
								key={allocation.id}
								projectName={allocation.project.name}
								colour={allocation.project.colour}
								hours={allocation.hours}
								onClick={() => onSelect(allocation)}
							/>
						))}
					</td>
				)
			})}
		</tr>
	));

	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>{getWeekLabel(weekOffset)}</th>
					<th>{getWeekLabel(weekOffset + 1)}</th>
					<th>{getWeekLabel(weekOffset + 2)}</th>
					<th>{getWeekLabel(weekOffset + 3)}</th>
				</tr>
			</thead>
			<tbody>
				{peopleRows}
			</tbody>
		</table>
	)
}

function getWeekLabel(offset: number): string {
	const date = new Date()
	date.setDate(date.getDate() + offset * 7)
	return date.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' })
}

interface TimelineGridProps {
	people: Person[],
	allocations: Allocation[],
	weekOffset: number,
	capacity: Record<string, number>,
	onSelect: (allocation: Allocation) => void
}