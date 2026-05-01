import type { Person } from '../types/models'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE_DATA } from '../queries/people' 


export default function PeoplePage(){
	const { data, loading, error } = useQuery(GET_PEOPLE_DATA)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>

	return (
		<div>
			<h2>People</h2>
			<ul>
				{data.people.map(person => (
					<li key={person.id}>{person.name} - {person.role}</li>
				))}
			</ul>
		</div>
	)
}