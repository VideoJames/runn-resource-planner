import { gql } from '@apollo/client'

export const GET_PROJECTS_DATA = gql`
	query GetProjectData {
		projects{
			id
			name
			colour
			status
		}
	}
`