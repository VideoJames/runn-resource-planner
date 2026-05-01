export default function AllocationBlock({projectName, colour, hours, onClick}: AllocationBlockProps){
	return (
		<div style={{backgroundColor:colour}} onClick={onClick}>
			<strong>{projectName}</strong>
			<span>{hours}h</span>
		</div>
	)
}

interface AllocationBlockProps {
	projectName: string,
	colour: string,
	hours: number,
	onClick: () => void
}