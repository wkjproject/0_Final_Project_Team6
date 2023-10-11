import './App.css';
import './components/ProjectPage.css'
//import ProjectData from './components/ProjectData';
import ProjectData2 from './components/ProjectData2';



function App() {
  return (
    <div className="App">
      <h1>json 데이터 가져오기(프로젝트 상세 페이지)</h1>
      <hr />헤더영역<hr />

      {/* <ProjectData></ProjectData> */}
      <ProjectData2></ProjectData2>
    </div>
  );
}

export default App;
