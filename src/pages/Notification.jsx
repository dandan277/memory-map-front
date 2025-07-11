import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heartIcon from "../assets/icons/heart.png";
import "../styles/Notification.css";

function Notification() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");

  const [newNotis, setNewNotis] = useState([
    { title: "제목", time: "06/27 19:09" },
    { title: "제목", time: "06/27 19:11" },
  ]);

  const [oldNotis, setOldNotis] = useState([]);

  const handleMoveToOld = (index) => {
    const item = newNotis[index];
    setNewNotis(prev => prev.filter((_, i) => i !== index));
    setOldNotis(prev => [item, ...prev]);
  };

  const notis = activeTab === "new" ? newNotis : oldNotis;

  return (
    <div className="notification-container">
      <div className="header">
        <div className="back" onClick={() => navigate(-1)}>←</div>
        <div className="title">알림</div>
      </div>

      <div className="tabs">
        <div
          className={activeTab === "new" ? "tab active" : "tab"}
          onClick={() => setActiveTab("new")}
        >
          새소식
        </div>
        <div
          className={activeTab === "old" ? "tab active" : "tab"}
          onClick={() => setActiveTab("old")}
        >
          이전소식
        </div>
      </div>

      {notis.length === 0 ? (
        <div className="empty">알림이 없습니다.</div>
      ) : (
        notis.map((n, i) => (
          <div
            className="noti-item"
            key={i}
            onClick={() => activeTab === "new" && handleMoveToOld(i)}
          >
            <img src={heartIcon} alt="heart" className="noti-icon" />
            <div className="noti-text">
              <div className="message">
                당신이 작성한 글 “{n.title}”이 하트를 받았습니다.
              </div>
              <div className="time">{n.time}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Notification;