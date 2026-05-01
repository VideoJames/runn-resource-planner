import type { Project } from '../types/models'
import { useQuery } from '@apollo/client'
import {GET_PROJECTS_DATA } from '../queries/projects'

export default function ProjectsPage() {
	const { data, loading, error } = useQuery(GET_PROJECTS_DATA)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>
	
	return (
		<div>
			<h2>Projects</h2>
			<ul>
				{data.projects.map(project => (
					<li key={project.id} style={{backgroundColor: project.colour}}>{project.name} - {project.status}</li>
				))}
			</ul>
		</div>
	)
}