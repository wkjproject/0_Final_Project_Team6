import './Home.css';
import React, { useEffect } from 'react';
import Slides from './Slides';
import ProjectList from './ProjectsList';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function Home() {
	const dispatch = useDispatch();  // useDispatch를 dispatch로 쉽게 쓰려고 넣는거에요.
		useEffect(() => {
		axios.get('http://localhost:5000/projName')
		.then((res) => {
			console.log(res.data.projName)
		})
	},[]);
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
