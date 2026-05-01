import type { Allocation } from '../types/models'
import { useState, useEffect } from 'react'
import TimelineGrid from './TimelineGrid'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PLANNER_DATA, DELETE_ALLOCATION } from '../queries/allocations'
import { getWeekStart } from '../lib/dates'

export default function PlannerView() {
	const { data, loading, error } = useQuery(GET_PLANNER_DATA)
	const [weekOffset, setWeekOffset] = useState(0)
	const [capacity, setCapacity] = useState<Record<string, number>>({})
	const [selected, setSelected] = useState<Allocation | null>(null)
	const [deleteAllocation] = useMutation(DELETE_ALLOCATION, {
		refetchQueries: [{ query: GET_PLANNER_DATA }],
	})
	
	useEffect(() => {
		const weekStart = getWeekStart(weekOffset)
		 fetch(`http://localhost:3001/capacity?weekStart=${weekStart}`)
			.then(res => res.json())
			.then(data => {
				const map: Record<string, number> = {}
				data.forEach((row: any) => {
					map[row.personId] = row.utilisationPercent				
				})
				setCapacity(map)
			})
	}, [weekOffset])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>

	return(
		<>
			<h1>Resource Planner</h1>
			<button onClick={() => setWeekOffset(weekOffset - 1)}>Prev</button>
			<button onClick={() => setWeekOffset(weekOffset + 1)}>Next</button>
			<TimelineGrid
				people={data.people}
				allocations={data.allocations}
				weekOffset={weekOffset}
				capacity={capacity}
				onSelect={setSelected}
			/>	
			{selected !== null && (
				<div>
					<p>Project: {selected.project.name}</p>
					<p>Hours: {selected.hours}</p>
					<button onClick={() => {
						deleteAllocation({ variables: { id: selected.id } })
						setSelected(null)
					}}>
						Delete
					</button>
				</div>
			)}
		</>
	)
}