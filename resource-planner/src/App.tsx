import { Routes, Route, Link } from 'react-router-dom'
import PeoplePage from './components/PeoplePage'
import ProjectsPage from './components/ProjectsPage'
import PlannerView from './components/PlannerView'

function App() {
	return (
		<div>
			<nav>
				<Link to="/">Planner</Link>
				<Link to="/people">People</Link>
				<Link to="/projects">Projects</Link>
			</nav>
			
			<Routes>
				<Route path="/" element={<PlannerView />} />
				<Route path="/people" element={<PeoplePage />} />
				<Route path="/projects" element={<ProjectsPage />} />
			</Routes>
		</div>
	)
}

export default App
