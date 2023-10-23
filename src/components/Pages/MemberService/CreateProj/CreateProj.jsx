import React, { Component } from "react";
import EditorBox from "./EditorBox";
import "./CreateProj.css";

class CreateProj extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      region: "",
      title: "",
      selectedImage: null,
      imageUrl: "",
      description: "",
      startDate: "",
      endDate: "",
      rewards: [{ time: "", price: "" }],
      goalAmount: "",
      projRegion: "",
      checkbox1Checked: false,
      checkbox2Checked: false,
    };
  }
  handleEditorChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    });
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  //이미지 핸들
  handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // 이미지 파일이 선택된 경우
      const imageUrl = URL.createObjectURL(file); // 파일을 URL로 변환
      this.setState({ selectedImage: file, imageUrl });
    } else {
      // 이미지 파일이 선택 해제된 경우
      this.setState({ selectedImage: null, imageUrl: "" });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지
    console.log("Submitted Data:", this.state); // 데이터 콘솔 출력
  };

  handleStartDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };

  handleEndDateChange = (e) => {
    this.setState({ endDate: e.target.value });
  };
  // 목표금액 전용 핸들
  handleGoalAmountChange = (e) => {
    this.setState({ goalAmount: e.target.value });
  };
  // 리워드 전용 핸들
  handleRewardChange = (index, e) => {
    const { name, value } = e.target;
    const rewards = [...this.state.rewards];

    if (rewards[index]) {
      rewards[index][name] = value;
    } else {
      rewards[index] = { [name]: value };
    }

    this.setState({ rewards });
  };
  // handleRewardChange = (index, e) => {
  //   const { name, value } = e.target;
  //   const rewards = [...this.state.rewards];
  //   rewards[index][name] = value;
  //   this.setState({ rewards });
  // };

  handleAddReward = () => {
    this.setState((prevState) => ({
      rewards: [...prevState.rewards, {}], // 삭제 버튼이 있는 리워드를 추가
    }));
  };
  // handleAddReward = () => {
  //   this.setState((prevState) => ({
  //     rewards: [...prevState.rewards, { time: "", price: "" }],
  //   }));
  // };

  handleRemoveReward = (index) => {
    const rewards = [...this.state.rewards];
    rewards.splice(index, 1);
    this.setState({ rewards });
  };

  // 체크박스 체크 여부 확인
  handleCheckbox1Change = () => {
    this.setState((prevState) => ({
      checkbox1Checked: !prevState.checkbox1Checked,
    }));
  };

  handleCheckbox2Change = () => {
    this.setState((prevState) => ({
      checkbox2Checked: !prevState.checkbox2Checked,
    }));
  };

  isButtonEnabled = () => {
    const { startDate, endDate, checkbox1Checked, checkbox2Checked } =
      this.state;
    // 두 개의 체크박스가 모두 체크되었을 때만 버튼이 활성화됨
    return checkbox1Checked && checkbox2Checked;
  };

  render() {
    const { imageUrl, goalAmount, rewards } = this.state;

    return (
      <div>
        <div className="form">
          <p>
            000님, 반가워요! <br /> 프로젝트가 성공할 수 있도록 <b>WW</b>가
            함께할게요.
          </p>
          <form onSubmit={this.handleSubmit}>
            <div className="createform">
              <h3>프로젝트 카테고리</h3>
              <select
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                <option value="모임/커뮤니티">모임/커뮤니티</option>
                <option value="관광/투어">관광/투어</option>
                <option value="강연/세미나">강연/세미나</option>
              </select>
              <select
                name="region"
                value={this.state.region}
                onChange={this.handleInputChange}
                className="selectRegion"
              >
                <option value="전체">전체</option>
                <option value="서울/경기/인천">서울/경기/인천</option>
                <option value="부산/울산/경남">부산/울산/경남</option>
                <option value="대구/경북">대구/경북</option>
                <option value="충청/대전/세종">충청/대전/세종</option>
                <option value="전라/광주">전라/광주</option>
                <option value="강원도">강원도</option>
                <option value="제주도">제주도</option>
              </select>
            </div>

            <div className="createform">
              <h3>프로젝트 제목</h3>
              <input
                placeholder="제목을 입력해주세요! (최대 60자)"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
                maxLength="60"
                className="inputBox"
              />
            </div>

            <div className="createform">
              <h3>대표 이미지 업로드</h3>
              <input
                type="file"
                accept="image/*"
                onChange={this.handleImageChange}
              />
            </div>

            <div className="createform projInfo">
              <h3>프로젝트 소개</h3>
              <EditorBox
                value={this.state.description}
                onChange={(value) =>
                  this.handleEditorChange({ name: "description", value })
                }
                className="editorbox"
              />
            </div>

            <div className="createform">
              <h3>목표 금액</h3>
              <input
                type="number"
                placeholder="목표 금액"
                value={goalAmount}
                onChange={this.handleGoalAmountChange}
                className="inputBox"
              />
            </div>

            <div className="createform">
              <h3>펀딩 위치</h3>
              <input
                type="text"
                placeholder="펀딩 위치"
                value={this.state.projRegion}
                onChange={this.handleInputChange}
                className="inputBox"
              />
            </div>

            <div className="createform">
              <h3>펀딩 일정</h3>
              <label>시작일 </label>
              <input
                type="date"
                onChange={this.handleStartDateChange}
                className="dateinput"
              />

              <label className="selectRegion">종료일 </label>
              <input
                type="date"
                onChange={this.handleEndDateChange}
                className="dateinput"
              />
            </div>

            <div className="createform">
              <h3>리워드 및 가격 추가</h3>
              <div>
                {rewards.map((reward, index) => (
                  <div
                    key={index}
                    className={`reward-input-container ${
                      index !== 0 ? "with-margin" : "first-reward"
                    }`}
                  >
                    <input
                      type="text"
                      name="time"
                      placeholder="시간"
                      value={reward.time}
                      onChange={(e) => this.handleRewardChange(index, e)}
                      className="rewardsinput"
                    />
                    <input
                      type="text"
                      name="price"
                      placeholder="가격"
                      value={reward.price}
                      onChange={(e) => this.handleRewardChange(index, e)}
                      className="rewardsinput rewardsinput2"
                    />
                    <button
                      onClick={this.handleAddReward}
                      className="rewardsButton"
                    >
                      리워드 추가
                    </button>
                    {index > 0 && (
                      <button
                        onClick={() => this.handleRemoveReward(index)}
                        className="rewardsButton"
                      >
                        삭제
                      </button>
                    )}

                    {/* <button
                      onClick={() => this.handleRemoveReward(index)}
                      className="rewardsButton"
                    >
                      삭제
                    </button> */}
                  </div>
                ))}
              </div>
            </div>

            <hr></hr>
            <h3 className="checkbefore">
              마지막으로, 이런 점들을 확인해 주세요!
            </h3>
            <div className="checkbox">
              <input
                type="checkbox"
                onChange={this.handleCheckbox1Change}
                checked={this.state.checkbox1Checked}
              />
              <p>
                대표 창작자는 <b>만 19세 이상</b>의 성인이어야 합니다.
              </p>
            </div>

            <div className="checkbox2">
              <input
                type="checkbox"
                onChange={this.handleCheckbox2Change}
                checked={this.state.checkbox2Checked}
              />
              <p>
                WW에서 필요 시 연락 드릴 수 있도록{" "}
                <b>본인 명의의 휴대폰 번호</b>와 <b>이메일 주소</b>가
                필요합니다.
              </p>
            </div>

            <div className="rule">
              <h3>심사기준</h3>
              <div className="rule-detail">
                <h4>O</h4>
                <ul>
                  <li>기존에 없던 새로운 시도</li>
                  <li>기존에 없던 작품, 제품, 디지털 콘텐츠, 활동, 행사</li>
                  <li>
                    창작자의 이전 제품 및 콘텐츠는 <br />
                    새로운 선물에 부수적으로 제공 가능
                  </li>
                </ul>
              </div>
              <div className="rule-detail">
                <h4>X</h4>
                <ul>
                  <li>기존 상품·콘텐츠의 판매 및 홍보</li>
                  <li>시중에 판매 및 유통되었던 제품·콘텐츠 제공</li>
                  <li>추첨을 통해서만 제공되는 선물</li>
                  <li>무기, 군용장비, 라이터 등 위험 품목</li>
                </ul>
              </div>
            </div>
            <hr></hr>
            <button
              type="submit"
              className="submit"
              onClick={this.handleButtonClick}
              disabled={!this.isButtonEnabled()}
            >
              심사 등록하기
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateProj;
