import styled from 'styled-components';

export const MemberShipContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const MemberShipDivCenter = styled.div`
  text-align: center;
`;

export const MemberShipInput = styled.input`
  width: 100%;
  height: 36px;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 20px;
  color: var(--Black);

  ::placeholder {
  text-align: center; /* placeholder 텍스트를 가운데 정렬 */
  }
`;

export const MemberShipInputShort = styled.input`
  width: 72%;
  height: 36px;
  border: 1px solid #000000;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 20px;
  color: var(--Black);
  
  ::placeholder {
  text-align: center; /* placeholder 텍스트를 가운데 정렬 */
  }
`;

export const MemberShipButton = styled.button`
  background-color: var(--ButtonDefault); /* 버튼색 설정 */
  width: 100%;
  color: var(--Black); /* 텍스트 색상 */
  padding: 10px 20px; /* 내부 여백 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 스타일 */
  border-radius: 4px; /* 둥근 모서리 */
  &:hover {
    background-color: var(--ButtonHover);
  }
  &:active {
    background-color: var(--ButtonPressed);
  }
`;

export const MemberShipButtonShort = styled.button`
  background-color: var(--ButtonDefault); /* 버튼색 설정 */
  width: 25%;
  color: var(--Black); /* 텍스트 색상 */
  padding: 10px 20px; /* 내부 여백 */
  margin-left: 10px;
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 스타일 */
  border-radius: 4px; /* 둥근 모서리 */
  &:hover {
    background-color: var(--ButtonHover);
  }
  &:active {
    background-color: var(--ButtonPressed);
  }
`;