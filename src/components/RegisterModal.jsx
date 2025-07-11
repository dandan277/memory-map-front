import React from "react";
import cat2 from "../assets/illustrations/cat2.png";

function RegisterModal({ currentAddress, onConfirm }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "317px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "314px",
        height: "193px",
        borderRadius: "17px",
        border: "2px solid #FFFFFF",
        background: "rgba(255, 255, 255, 0.78)",
        backdropFilter: "blur(10px)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Pretendard",
          fontSize: "18px",
          fontWeight: 500,
          color: "#292A33",
          marginBottom: "5px",
        }}
      >
        {currentAddress ? currentAddress : "위치 확인 중..."}
      </div>
      <div
        style={{
          fontFamily: "Pretendard",
          fontSize: "20px",
          fontWeight: 500,
          color: "#292A33",
          marginBottom: "10px",
        }}
      >
        새로운 이야기를 등록하실 건가요?
      </div>
      <img
        src={cat2}
        alt="cat"
        style={{ width: "120px", height: "120px", marginBottom: "35px" }}
      />
      <div
        onClick={onConfirm}
        style={{
          width: "236px",
          height: "43px",
          borderRadius: "17px",
          border: "2px solid #FFFFFF",
          background: "rgba(255, 255, 255, 0.69)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          marginTop: "-70px",
        }}
      >
        <span
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 500,
            color: "#292A33",
          }}
        >
          등록하기
        </span>
      </div>
    </div>
  );
}

export default RegisterModal;
