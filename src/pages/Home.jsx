import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import BottomNavBar from "../components/BottomNavBar";
import searchIcon from "../assets/icons/search.png";
import bellIcon from "../assets/icons/bell.png";
import catImage from "../assets/illustrations/cat1.png";
import MapBox from "../components/MapBox";
import storyImage from "../assets/icons/story.png";

function Home({ storyCount }) {
  const navigate = useNavigate();
  const [hasNewAlert, setHasNewAlert] = useState(true);

  return (
    <div className="home-container">
      <img src={searchIcon} alt="search" className="icon search" />

      <div style={{ position: "relative" }}>
        <img
          src={bellIcon}
          alt="bell"
          className="icon bell"
          onClick={() => {
            navigate("/Notification");
            setHasNewAlert(false);
          }}
        />
        {hasNewAlert && <div className="red-dot" />}
      </div>

      <div className="small-box" style={{ left: "24px" }}></div>
      <div className="small-box" style={{ left: "88px" }}></div>
      <div className="small-box" style={{ left: "152px" }}></div>
      <div className="small-box" style={{ left: "216px" }}></div>

      <div className="cat-card">
        <img src={catImage} alt="cat" className="cat-img" />
      </div>

      {storyCount === 0 && (
        <img src={storyImage} alt="등록 안내" className="no-story-img" />
      )}

      <div className="cat-text">
        <p>
          <span className="bold">최지한</span>
          <span>님께서</span>
        </p>
        <p>
          <span>지금까지 등록한</span>
        </p>
        <p>
          <span>이야기는 </span>
          <span className="bold">{storyCount}</span>
          <span>개입니다.</span>
        </p>
      </div>

      <div className="bottom-text">우리 지역 이야기 보러가기</div>

      <div
        style={{
          position: "absolute",
          top: "411px",
          left: "38px",
          width: "297px",
          height: "303px",
          borderRadius: "42px",
          border: "3px solid #FFFFFF",
          backgroundColor: "#1e1e1e",
          overflow: "hidden",
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={() => navigate("/map")}
      >
        <MapBox />
      </div>

      <BottomNavBar />
    </div>
  );
}

export default Home;
