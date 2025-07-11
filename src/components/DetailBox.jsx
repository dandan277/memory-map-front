import React from "react";
import cat2 from "../assets/illustrations/cat2.png";

function DetailBox() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "44px",
          top: "221px",
          width: "314px",
          height: "316px",
          borderRadius: "17px",
          border: "2px solid #FFFFFF",
          background: "rgba(255, 255, 255, 0.78)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          zIndex: 25,
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 500,
            color: "#000000",
            position: "absolute",
            left: "30px",
            top: "20px",
          }}
        >
          제목
        </div>
        <div
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 500,
            color: "#000000",
            position: "absolute",
            left: "250px",
            top: "60px",
          }}
        >
          과거
        </div>
        <div
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 500,
            color: "#000000",
            position: "absolute",
            left: "30px",
            top: "100px",
          }}
        >
          본문
        </div>
        <div
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 500,
            color: "#808080",
            position: "absolute",
            left: "100px",
            top: "250px",
            textDecoration: "underline",
          }}
        >
          자세히 보기...
        </div>
      </div>

      <img
        src={cat2}
        alt="cat"
        style={{
          position: "absolute",
          top: "130px",
          left: "223px",
          width: "136px",
          height: "136px",
          zIndex: 26,
        }}
      />
    </>
  );
}

export default DetailBox;
