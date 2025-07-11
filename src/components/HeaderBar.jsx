import React from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";

function HeaderBar({ navigate }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "44px",
        left: 0,
        width: "100%",
        height: "44px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 36px",
        boxSizing: "border-box",
        zIndex: 10,
      }}
    >
      <FaArrowLeft
        onClick={() => navigate(-1)}
        style={{ width: "18px", height: "18px", color: "#292A33", cursor: "pointer" }}
      />
    </div>
  );
}

export default HeaderBar;