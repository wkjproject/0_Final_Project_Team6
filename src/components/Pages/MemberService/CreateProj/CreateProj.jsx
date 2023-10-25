import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditorBox from "./EditorBox";
import "./CreateProj.css";
import Endpoint from "../../../../config/Endpoint";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProjForm } from "../../../../redux/reducer/createProj";
import { height } from "@mui/system";

const CreateProj = () => {
  const [state, setState] = useState({
    projTag: "0",
    projRegion: "0",
    projName: "",
    selectedImage: null,
    imageUrl: "",
    projDesc: "",
    projFundStartDate: "",
    projFundEndDate: "",
    projReward: [{ time: "", price: "", amount: "" }],
    goalAmount: "",
    projPlace: "",
    checkbox1Checked: false,
    checkbox2Checked: false,
  });

  const handleEditorChange = ({ name, value }) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //이미지 핸들
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // 이미지 파일이 선택된 경우
      const imageUrl = URL.createObjectURL(file); // 파일을 URL로 변환
      setState((prevState) => ({
        ...prevState,
        selectedImage: file,
        imageUrl,
      }));
    } else {
      // 이미지 파일이 선택 해제된 경우
      setState((prevState) => ({
        ...prevState,
        selectedImage: null,
        imageUrl: "",
      }));
    }
  };

  const handleStartDateChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      projFundStartDate: e.target.value,
    }));
  };

  const handleEndDateChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      projFundEndDate: e.target.value,
    }));
  };

  // 목표금액 전용 핸들
  const handleGoalAmountChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      goalAmount: e.target.value,
    }));
  };

  // 리워드 전용 핸들
  const handleRewardChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRewards = state.projReward.map((reward, i) => {
      if (i === index) {
        return { ...reward, [name]: value };
      }
      return reward;
    });

    setState((prevState) => ({
      ...prevState,
      projReward: updatedRewards,
    }));
  };

  const handleAddReward = () => {
    setState((prevState) => ({
      ...prevState,
      projReward: [...prevState.projReward, {}], // 삭제 버튼이 있는 리워드를 추가
    }));
  };

  const handleRemoveReward = (index) => {
    const updatedRewards = state.projReward.filter((_, i) => i !== index);
    setState((prevState) => ({
      ...prevState,
      projReward: updatedRewards,
    }));
  };

  // 체크박스 체크 여부 확인
  const handleCheckbox1Change = () => {
    setState((prevState) => ({
      ...prevState,
      checkbox1Checked: !prevState.checkbox1Checked,
    }));
  };

  const handleCheckbox2Change = () => {
    setState((prevState) => ({
      ...prevState,
      checkbox2Checked: !prevState.checkbox2Checked,
    }));
  };

  const isButtonEnabled = () => {
    const { startDate, endDate, checkbox1Checked, checkbox2Checked } = state;
    // 두 개의 체크박스가 모두 체크되었을 때만 버튼이 활성화됨
    return checkbox1Checked && checkbox2Checked;
  };

  const { imageUrl, goalAmount, projReward } = state;
  const endpoint = Endpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 리덕스의 userId 가져오기
  const userName = useSelector((state) => state.auth.auth.userName)

  const handler = (e) => {
    e.preventDefault();
  };

  // 서밋 버튼을 누르면 state 내용이 넘어감...?
  const handleSubmit = async (evt) =>{
    evt.preventDefault();
    try{
      const projData = state;
      await axios.post(`${endpoint}/createProj`,{
        projData
      }).then((res)=>{
        console.log(state);
        if(res.data.createProjSuccess){
          dispatch(setProjForm(res.data.state));  
          alert('심사 등록 완료!');
          navigate('/home');
        }
      })
    }
    catch(e){
      alert('등록을 실패하였습니다.');
    }
  };

  return (
    <div>
      <div className="form">
        <p style={{lineHeight:'30px'}}>
          {userName}님, 반가워요! <br /> 프로젝트가 성공할 수 있도록 <b>WW</b>가
          함께할게요.
        </p>
        <form onSubmit={handler}>
          <div className="createform">
            <h3>프로젝트 카테고리</h3>
            <select
              name="projTag"
              value={state.projTag}
              onChange={handleInputChange}
            >
              <option value="0">모임/커뮤니티</option>
              <option value="1">관광/투어</option>
              <option value="2">강연/세미나</option>
            </select>
            <select
              name="projRegion"
              value={state.projRegion}
              onChange={handleInputChange}
              className="selectRegion"
            >
              <option value="0">서울/경기/인천</option>
              <option value="1">부산/울산/경남</option>
              <option value="2">대구/경북</option>
              <option value="3">충청/대전/세종</option>
              <option value="4">전라/광주</option>
              <option value="5">강원도</option>
              <option value="6">제주도</option>
            </select>
          </div>

          <div className="createform">
            <h3>프로젝트 제목</h3>
            <input
              placeholder="제목을 입력해주세요! (최대 60자)"
              type="text"
              name="projName"
              value={state.projName}
              onChange={handleInputChange}
              maxLength="60"
              className="inputBox"
            />
          </div>

          <div className="createform">
            <h3>대표 이미지 업로드</h3>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="createform projInfo">
            <h3>프로젝트 소개</h3>
            <EditorBox
              value={state.projDesc}
              onChange={(value) =>
                handleEditorChange({ name: "projDesc", value })
              }
              className="editorbox"
            />
          </div>

          <div className="createform">
            <h3>목표 금액</h3>
            <input
              type="number"
              placeholder="목표 금액"
              value={state.goalAmount}
              onChange={handleGoalAmountChange}
              className="inputBox"
            />
          </div>

          <div className="createform">
            <h3>펀딩 위치</h3>
            <input
              name="projPlace"
              type="text"
              placeholder="펀딩 위치"
              value={state.projPlace}
              onChange={handleInputChange}
              className="inputBox"
            />
          </div>

          <div className="createform">
            <h3>펀딩 일정</h3>
            <label>시작일 </label>
            <input
              type="date"
              value={state.projFundStartDate}
              onChange={handleStartDateChange}
              className="dateinput"
            />

            <label className="selectRegion">종료일 </label>
            <input
              type="date"
              value={state.projFundEndDate}
              onChange={handleEndDateChange}
              className="dateinput"
            />
          </div>

          <div className="createform">
            <h3>리워드 및 가격 추가</h3>
            <div>
              {projReward.map((reward, index) => (
                <div
                  key={index}
                  className={`reward-input-container ${
                    index !== 0 ? "with-margin" : "first-reward"
                  }`}
                >
                  <input
                    type="datetime-local"
                    name="time"
                    placeholder="시간"
                    value={projReward.time}
                    onChange={(e) => handleRewardChange(index, e)}
                    className="rewardsinput"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="가격"
                    value={projReward.price}
                    onChange={(e) => handleRewardChange(index, e)}
                    className="rewardsinput rewardsinput2"
                  />
                  <input
                    type="number"
                    name="amount"
                    placeholder="개수"
                    value={projReward.amount}
                    onChange={(e) => handleRewardChange(index, e)}
                    className="rewardsinput rewardsinput2"
                  />
                  <button onClick={handleAddReward} className="rewardsButton">
                    리워드 추가
                  </button>
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveReward(index)}
                      className="rewardsButton"
                    >
                      삭제
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr></hr>
          <h3 className="warnmessage">마지막으로, 이런 점들을 확인해 주세요!</h3>
          <div className="checkbox">
            <input
              type="checkbox"
              onChange={handleCheckbox1Change}
              checked={state.checkbox1Checked}
            />
            <p>
              대표 창작자는 <b>만 19세 이상</b>의 성인이어야 합니다.
            </p>
          </div>

          <div className="checkbox2">
            <input
              type="checkbox"
              onChange={handleCheckbox2Change}
              checked={state.checkbox2Checked}
            />
            <p>
              WW에서 필요 시 연락 드릴 수 있도록 <b>본인 명의의 휴대폰 번호</b>
              와 <b>이메일 주소</b>가 필요합니다.
            </p>
          </div>

          <div className="rule">
            <h3>심사기준</h3>
            <div className="rule-detail yes">
              <h4>O</h4>
              <ul>
                <li>· 기존에 없던 새로운 시도</li>
                <li>· 기존에 없던 작품, 디지털 콘텐츠, 활동, 행사</li>
                <li>
                · 창작자의 이전 제품 및 콘텐츠는 <br />
                  새로운 선물에 부수적으로 제공 가능
                </li>
              </ul>
            </div>
            <div className="rule-detail no">
              <h4>X</h4>
              <ul>
                <li>· 기존 상품·콘텐츠의 판매 및 홍보</li>
                <li>· 시중에 판매 및 유통되었던 제품·콘텐츠 제공</li>
                <li>· 추첨을 통해서만 제공되는 선물</li>
                <li>· 무기, 군용장비, 라이터 등 위험 품목</li>
              </ul>
            </div>
          </div>
          <hr></hr>
          <button
            name="submit"
            type="submit"
            className="submit"
            onClick={handleSubmit}
            disabled={!isButtonEnabled()}
          >
            심사 등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProj;
