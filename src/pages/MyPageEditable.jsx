import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPageEditable.css";
import background from "../assets/images/ww.png";
import catPro from "../assets/illustrations/cat-pro.png";
import pen from "../assets/images/pen.png";
import ok2 from "../assets/images/ok2.png";
import rec from "../assets/images/Rec.png";
import cat3 from "../assets/illustrations/cat3.png";
import cat4 from "../assets/illustrations/cat4.png";
import cat5 from "../assets/illustrations/cat5.png";
import cat6 from "../assets/illustrations/cat6.png";
import cat7 from "../assets/illustrations/cat7.png";
import ok from "../assets/images/ok.png";

function MyPageEditable() {
  const [nickname, setNickname] = useState("최지한");
  const [isEditingName, setIsEditingName] = useState(false);
  const [showOkButton, setShowOkButton] = useState(false);
  const [isProfileChoosing, setIsProfileChoosing] = useState(false);
  const [selectedCat, setSelectedCat] = useState("cat3");
  const [showCompleteImg, setShowCompleteImg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowCompleteImg(true); // 페이지 열리자마자 버튼 띄우기
  }, []);

  const handleNameEdit = () => {
    setNickname("");
    setIsEditingName(true);
    setShowOkButton(true);
  };

  const handleProfileEdit = () => {
    setIsProfileChoosing(true);
    setShowOkButton(false);
    setShowCompleteImg(true);
  };

  const handleNameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleCatClick = (catId) => {
    if (catId === "cat4") {
      setSelectedCat("cat6");
    } else if (catId === "cat5") {
      setSelectedCat("cat7");
    }
  };

  const handleComplete = () => {
    console.log("닉네임:", nickname);
    console.log("프로필:", selectedCat);
    setShowCompleteImg(false);
    navigate("/");
  };

  return (
    <div
      className="mypage-editable-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="editable-profile-box">
        <div className="image-wrapper">
          <img src={catPro} alt="프로필" className="cat-profile" />
          <img
            src={pen}
            alt="펜"
            className="pen-on-profile"
            onClick={handleProfileEdit}
          />
        </div>
        <div className="editable-profile-text">
          <div className="name-wrapper">
            {isEditingName ? (
              <div className="nickname-inline-wrapper">
                <input
                  type="text"
                  value={nickname}
                  onChange={handleNameChange}
                  className="nickname-input"
                  size={nickname.length || 1}
                />
                <span className="name-inline">님</span>
              </div>
            ) : (
              <>
                <span className="name">{nickname}님</span>
                <img
                  src={pen}
                  alt="이름 수정"
                  className="pen-on-name"
                  onClick={handleNameEdit}
                />
              </>
            )}
          </div>
          <div className="address">의성읍 충효로</div>
        </div>
      </div>

      {showOkButton && !isProfileChoosing && (
        <div className="ok-button-wrapper">
          <img src={ok2} alt="확인" className="ok2" />
          <span className="ok-text">닉네임 수정 완료</span>
        </div>
      )}

      {isProfileChoosing && (
        <div className="profile-select-box">
          <img src={rec} alt="배경" className="profile-background" />
          <div className="profile-cat-row">
            <div className="cat-container">
              <img src={cat3} alt="기본" className="profile-cat" />
              <div className="profile-caption">
                이미 사용중인<br />프로필입니다.
              </div>
            </div>
            <img
              src={selectedCat === "cat6" ? cat6 : cat4}
              alt="cat4"
              className="profile-cat"
              onClick={() => handleCatClick("cat4")}
            />
            <img
              src={selectedCat === "cat7" ? cat7 : cat5}
              alt="cat5"
              className="profile-cat"
              onClick={() => handleCatClick("cat5")}
            />
          </div>
        </div>
      )}

      {showCompleteImg && (
        <div
          style={{
            position: "fixed",
            bottom: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "260px",
            height: "100px",
            zIndex: 1000,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={ok}
              alt="완료하기"
              onClick={handleComplete}
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#000000",
                fontSize: "18px",
                fontWeight: "bold",
                pointerEvents: "none",
              }}
            >
              완료하기
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPageEditable;