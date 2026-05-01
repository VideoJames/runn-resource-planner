import { gql } from '@apollo/client'

export const GET_PLANNER_DATA = gql`
	query GetPlannerData {
		allocations{
			id
			hours
			week_start_date
			person {
				id
				name
				role
				capacity_hours_per_week
			}
			project {
				id
				name
				colour
			}
		}
		people {
			id
			name
			role
			capacity_hours_per_week
		}
	}
`

export const DELETE_ALLOCATION = gql`
	mutation DELETE_ALLOCATION($id: uuid!) {
		delete_allocations_by_pk(id: $id) {
			id
		}
	}
`