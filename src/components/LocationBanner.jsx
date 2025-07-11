import React from "react";

function LocationBanner({ navigate, pouch, count }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "91px",
          left: "36px",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "Pretendard",
          color: "#292A33",
          zIndex: 10,
        }}
      >
        경상북도 의성군
      </div>

      <div
        style={{
          position: "absolute",
          top: "141px",
          left: "36px",
          width: "323px",
          height: "59px",
          borderRadius: "12px",
          border: "1px solid #FFFFFF",
          background: "linear-gradient(90deg, #3D4250 0%, #52596C 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxSizing: "border-box",
          zIndex: 10,
        }}
      >
        <span
          onClick={() => navigate("/story-detail")}
          style={{
            fontFamily: "Pretendard",
            fontSize: "20px",
            fontWeight: 500,
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          이야기 주머니
        </span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={pouch}
            alt="pouch"
            style={{ width: "32px", height: "24px", marginRight: "5px" }}
          />
          <span
            style={{
              fontFamily: "Pretendard",
              fontSize: "20px",
              fontWeight: 500,
              color: "#FFFFFF",
            }}
          >
            {count}
          </span>
        </div>
      </div>
    </>
  );
}

export default LocationBanner;
