import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectsList';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setProjName } from '../../redux/reducer/projNameAction';
import Endpoint from '../../config/Endpoint';


export default function ReduxTest() {
	const [projNameState, setProjNameState] = useState([]); // projName이 배열로 여러개 들어가있기때문에 초기값을 [] 배열로 받아줘야해요
	const dispatch = useDispatch();  // useDispatch를 dispatch로 쉽게 쓰려고 넣는거에요.
	useEffect(() => {
		const endpoint = Endpoint();
		axios.get(`${endpoint}/projName`)
			.then((res) => {
				dispatch(setProjName(res.data.projName)); //크롬 웹스토어 Redux Devtools 로 리덕스에 값 들어갔는지 확인할수있어요
				setProjNameState(res.data.projName);
			}).catch((err) => {
				console.log(err);
			})
	}, []);
	const projName = useSelector((state) => state.projName.projName)
	return (
		<>
			<div>
				<p>projName 테스트페이지입니다.</p>
				{projNameState.map((item, index) => (
					<p key={index}>{item.projName}</p>
				))}
			</div>
		</>

	)
}
