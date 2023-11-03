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
import AddressSearch from "../Address/AddressSearch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProj = () => {
  axios.defaults.withCredentials = false;
  const [state, setState] = useState({
    projTag: "0",
    projRegion: "0",
    projName: "",
    selectedImage: null,
    imageUrl: "",
    imageBase64: "",
    projDesc: "",
    projFundStartDate: "",
    projFundEndDate: "",
    projReward: [{ projRewardName: "", projRewardAmount: "", projRewardCount: "" }],
    goalAmount: "",
    projPlace: "",
    checkbox1Checked: false,
    checkbox2Checked: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  // Blob URL을 base64로 변환하는 함수
  function blobUrlToBase64(blobUrl, callback) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onload = () => {
        callback(reader.result.split(',')[1]); // base64 데이터 부분 추출
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', blobUrl);
    xhr.send();
  }

  // 이미지 업로드 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setState((prevState) => ({
        ...prevState,
        selectedImage: file,
        imageUrl,
      }));

      // Blob URL을 base64로 변환
      blobUrlToBase64(imageUrl, (base64Data) => {
        setState((prevState) => ({
        ...prevState,
        imageBase64: base64Data,
      }));
      });
    } else {
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
    return checkbox1Checked && checkbox2Checked && !isSubmitted;
  };

  const { imageUrl, goalAmount, projReward } = state;
  const endpoint = Endpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 리덕스의 userName, userId, userAddr 가져오기
  const userName = useSelector((state) => state.userData.userData.userName)
  const userId = useSelector((state) => state.userData.userData.userId)
  const projPlace = useSelector((state) => {
    const projPlaceAddr = state.projPlaceAddr?.projPlaceAddr;
    return projPlaceAddr ? projPlaceAddr.projPlace : undefined;
    });
  const projAddr = useSelector((state) => {
    const projPlaceAddr = state.projPlaceAddr?.projPlaceAddr;
    return projPlaceAddr ? projPlaceAddr.projAddr : undefined;
    });
  const handler = (e) => {
    e.preventDefault();
  };
  
  // 이미지 업로드 API 사용해서 url로 변경하기
  const uploadImage = async (img) => {
    const body = new FormData();
    body.set('key', '04ee2299a6c1b4578ea914699922672d');
    body.append('image', img);
    try {
      const response = await axios.post('https://api.imgbb.com/1/upload', body);
      return response.data.data.display_url;
    } catch (error) {
      // 오류 처리 로직을 추가할 수 있습니다.
      console.log('이미지 업로드 중 오류 발생:', error);
    }
  };


  // 심사등록하기 버튼 누를 경우
  const handleSubmit = async (evt) =>{
    setIsSubmitted(true);
    evt.preventDefault();
    if(state.projName === ""){
      toast('프로젝트 제목을 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.imageBase64 === ""){
      toast('대표 이미지를 업로드 해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.projDesc === ""){
      toast('프로젝트 소개를 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.projFundStartDate === ""){
      toast('펀딩 시작일을 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.projFundEndDate === ""){
      toast('펀딩 종료일을 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.projFundEndDate === ""){
      toast('펀딩 종료일을 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.projReward.length === 0){
      toast('리워드를 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.goalAmount === ""){
      toast('목표금액을 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if(state.projReward.length === 0){
      toast('리워드를 입력해주세요.')
      setIsSubmitted(false);
      return;
    }
    if (projAddr === undefined){
			toast('펀딩위치를 입력해주세요.')
      setIsSubmitted(false);
			return;
		}
    
    try{
      // img 태그 base64 정규 패턴
      const imgPattern = /<img src="data:image\/.+?;base64,(.+?)">/;
      // state.projDesc에서 패턴에 일치하는 값 확인
      const matches = state.projDesc.match(imgPattern);

      // 모든 match 값을 확인
      if (matches) {
        for (const match of matches) {
          const matchResult = match.match(/<img src="data:image\/.+?;base64,(.+?)">/);
          if (matchResult && matchResult[1]) {
            const base64ImageData = matchResult[1];
            const newUrl = await uploadImage(base64ImageData);
            state.projDesc = state.projDesc.replace(match, `<img src="${newUrl}" />`);
          }
        }
      }
      const uploadImgUrl = await uploadImage(state.imageBase64)

      // state에서 imageBase64를 제외한 속성을 postData로 복사
      const { imageBase64, ...postData } = state; 
      await axios.post(`${endpoint}/createProj`, {
        ...postData,
        uploadImgUrl,
        userId,
        projPlace,
        projAddr,
      }).then((res)=> {
        if(res.data.success){
          setIsSubmitted(false);
          toast('등록 성공');
          navigate('/mypage');
        }
      })
    }
    catch(err){
      console.error(`에러 유형: ${err.name}`);
      console.error(`에러 메시지: ${err.message}`);
      // 필요한 경우 에러 객체의 다른 프로퍼티를 출력
      console.error(err);
      setIsSubmitted(false);
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
            {/* AddressSearch css수정 */}
            <AddressSearch CallClassName={'createProjButtonShort'} />
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
            <div style={{position:'absolute', top:'989px'}}>
            <h3>리워드 및 가격 추가</h3>
            </div>
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
                    name="projRewardName"
                    placeholder="시간"
                    value={projReward.projRewardName}
                    onChange={(e) => handleRewardChange(index, e)}
                    className="rewardsinput"
                  />
                  <input
                    type="number"
                    name="projRewardAmount"
                    placeholder="가격"
                    value={projReward.projRewardAmount}
                    onChange={(e) => handleRewardChange(index, e)}
                    className="rewardsinput rewardsinput2"
                  />
                  <input
                    type="number"
                    name="projRewardCount"
                    placeholder="개수"
                    value={projReward.projRewardCount}
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
