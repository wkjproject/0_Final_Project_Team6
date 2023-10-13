import React, { useEffect } from 'react';
import ProjectList from './ProjectsList';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProjName } from '../../redux/reducer/projNameAction';

export default function ReduxTest() {
	const dispatch = useDispatch();  // useDispatch를 dispatch로 쉽게 쓰려고 넣는거에요.
		useEffect(() => {
			axios.get('http://localhost:5000/projName')
			.then((res) => {
				 dispatch(setProjName(res.data.projName));  
		})
	},[]);
	const projName = useSelector((state)=> state.projName.projName) 
	return (
		<>
		<div>
			<p>projName 테스트페이지입니다.</p>
			{projName.map( (item, index) => (
				<p key={index}>{item.projName}</p>
			))}
		</div>
		</>

	)
}
