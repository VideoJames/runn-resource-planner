export default function PersonCard({name, role, capacityHoursPerWeek}: PersonCardProps) {
	return (
		<div className="person-card">
			<h3 className="person-name">{name}</h3>
			<p className="person-role">{role}</p>
			<div className="person-capacity">
				{capacityHoursPerWeek} hrs/week
			</div>
		</div>
	)
}

interface PersonCardProps {
	name: string
	role: string
	capacityHoursPerWeek: number
}

