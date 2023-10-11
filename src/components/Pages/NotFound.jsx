import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SimpleButton = styled.button`
	color: red;
`;

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className='page-container'>
			<div>해당 페이지를 찾지 못했습니다.</div>
			<div>주소가 잘못되었거나 더 이상 제공되지 않는 페이지입니다.</div>
			
			<div onClick={()=> navigate('/')}>
				<SimpleButton>메인페이지로 이동</SimpleButton>
				</div>			
		</div>
	)
}
