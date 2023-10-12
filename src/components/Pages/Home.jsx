import './Home.css';
import React from 'react';
import Slides from './Slides';
import ProjectList from './ProjectsList';

export default function Home() {
	return (
		<>
		<div className="contents">
			<Slides />
			<div className="project-container">
				<ProjectList />
				<div className="project-ranking-list"></div>
			</div>
		</div>
		</>

	)
}
