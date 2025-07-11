import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";
import catPro from "../assets/illustrations/cat-pro.png";
import box1 from "../assets/images/box1.png";
import box2 from "../assets/images/box2.png";
import box3 from "../assets/images/box3.png";
import BottomNavBar from "../components/BottomNavBar";

function MyPage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [logoutYesPressed, setLogoutYesPressed] = useState(false);
  const [withdrawYesPressed, setWithdrawYesPressed] = useState(false);
  const navigate = useNavigate();

  const handleLogoutYes = () => {
    if (!logoutYesPressed) {
      setLogoutYesPressed(true);
    } else {
      setShowLogoutModal(false);
      setLogoutYesPressed(false);
    }
  };

  const handleWithdrawYes = () => {
    if (!withdrawYesPressed) {
      setWithdrawYesPressed(true);
    } else {
      setShowWithdrawModal(false);
      setWithdrawYesPressed(false);
    }
  };

  return (
    <div className="mypage-container">
      <div className="profile-box">
        <img
          src={catPro}
          alt="고양이 프로필"
          className="cat-profile"
          onClick={() => navigate("/pages/editable")}
          style={{ cursor: "pointer" }}
        />
        <div className="profile-text">
          <div className="name">최지한님</div>
          <div className="address">의성읍 충효로</div>
        </div>
      </div>

      <div className="menu-item">
        <div
          className="menu-text"
          onClick={() => {
            navigate("/mypage/posts");
          }}
        >
          내가 쓴 글
        </div>
        <div className="menu-divider"></div>
      </div>

      <div className="menu-item" onClick={() => navigate("/memory-photos")}>
        <div className="menu-text">추억의 사진들</div>
        <div className="menu-divider"></div>
      </div>

      <div className="menu-item" onClick={() => setShowLogoutModal(true)}>
        <div className="menu-text">로그아웃</div>
        <div className="menu-divider"></div>
      </div>

      <div className="menu-item" onClick={() => navigate("/edit-profile")}>
        <div className="menu-text">정보 수정</div>
        <div className="menu-divider"></div>
      </div>

      <div className="menu-item" onClick={() => setShowWithdrawModal(true)}>
        <div className="menu-text">회원 탈퇴</div>
        <div className="menu-divider"></div>
      </div>

      {showLogoutModal && (
        <div className="logout-modal">
          <img src={box1} alt="logout-box" className="logout-box" />
          <div className="logout-text">정말 로그아웃 할까요?</div>
          <div className="yes-button" onClick={handleLogoutYes}>
            <img src={logoutYesPressed ? box3 : box2} alt="예 버튼" />
            <span className="yes-text">예</span>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="withdraw-modal">
          <img src={box1} alt="withdraw-box" className="logout-box" />
          <div className="logout-text">정말 탈퇴 할까요?</div>
          <div className="yes-button" onClick={handleWithdrawYes}>
            <img src={withdrawYesPressed ? box3 : box2} alt="예 버튼" />
            <span className="yes-text">예</span>
          </div>
        </div>
      )}

      <BottomNavBar />
    </div>
  );
}

export default MyPage;

