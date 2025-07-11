import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mapActive from "../assets/icons/map_active.png";
import mapInactive from "../assets/icons/map_inactive.png";
import homeActive from "../assets/icons/home_active.png";
import homeInactive from "../assets/icons/home_inactive.png";
import myActive from "../assets/icons/my_active.png";
import myInactive from "../assets/icons/my_inactive.png";
import "./BottomNavBar.css";

function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMap = location.pathname.includes("map");
  const isHome = location.pathname === "/";
  const isMy = location.pathname.includes("mypage");

  return (
    <div className="bottom-navbar">
      <img
        src={isMap ? mapActive : mapInactive}
        alt="Map"
        className="nav-icon"
        onClick={() => navigate("/map")}
      />
      <img
        src={isHome ? homeActive : homeInactive}
        alt="Home"
        className="nav-icon"
        onClick={() => navigate("/")}
      />
      <img
        src={isMy ? myActive : myInactive}
        alt="My"
        className="nav-icon"
        onClick={() => navigate("/mypage")}
      />
    </div>
  );
}

export default BottomNavBar;
