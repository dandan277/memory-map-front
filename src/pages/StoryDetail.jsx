import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import boxImage from "../assets/images/box.png";
import catProfile from "../assets/illustrations/cat-pro.png";
import heart1 from "../assets/icons/heart1.png";
import heart2 from "../assets/icons/heart2.png";

function StoryDetail() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(6);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#1C1C24",
        position: "relative",
        fontFamily: "Pretendard",
        color: "#FFFFFF",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "49px 0 0 49px",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderLeft: "2px solid #FFFFFF",
            borderBottom: "2px solid #FFFFFF",
            transform: "rotate(45deg)",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        ></div>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>이야기 주머니</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "111px",
          left: "49px",
          width: "305px",
          height: "733px",
          backgroundImage: `url(${boxImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "47px 30px 0",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: 500, marginBottom: "30px" }}>
          제목
        </div>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
          <img
            src={catProfile}
            alt="cat"
            style={{ width: "30px", height: "30px", marginRight: "12px" }}
          />
          <div>
            <div style={{ fontSize: "14px", fontWeight: 500 }}>최지한</div>
            <div style={{ fontSize: "11px", fontWeight: 400 }}>의성군 의성읍</div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#FFFFFF",
            marginBottom: "10px",
          }}
        ></div>

        <div style={{ fontSize: "12px", textAlign: "right", fontWeight: 500, marginBottom: "16px" }}>
          과거
        </div>

       
        <div
          style={{
            position: "absolute",
            bottom: "42px",
            right: "36px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={liked ? heart2 : heart1}
            alt="heart"
            style={{ width: "34px", height: "29px", cursor: "pointer" }}
            onClick={toggleLike}
          />
          <span style={{ marginLeft: "6px", fontSize: "20px", fontWeight: 500 }}>{likeCount}</span>
        </div>
      </div>
    </div>
  );
}

export default StoryDetail;
