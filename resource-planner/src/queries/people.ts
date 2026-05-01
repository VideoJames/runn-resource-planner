import { gql } from '@apollo/client'

export const GET_PEOPLE_DATA = gql`
	query GetPeopleData{
		people {
			id
			name
			role
			capacity_hours_per_week
		}
	}
`