import { useState } from "react";
import "../styles/Post.css";
import boxImage from "../assets/images/box.png";
import resultImage from "../assets/images/Rec.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SPRING_API = "http://34.64.144.67/api/v1/posts/posts";
const FASTAPI_API = "https://test12-891679491267.asia-northeast3.run.app/generate-image";

function Post() {
  const [timeType, setTimeType] = useState("과거");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const timeTypes = ["과거", "현재", "미래"];

  const handleSubmit = async () => {
  setIsSubmitting(true);
  setError("");
  const token = localStorage.getItem("accessToken"); // JWT 꺼내오기

  try {
    // 1. FastAPI(이미지 생성) 요청 (JWT 포함!)
    const fastApiRes = await axios.post(
      FASTAPI_API,
      { title, content },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    const imageUrl = fastApiRes.data.image_url;

    // 2. Spring(게시글 저장) 요청 (JWT 포함!)
    await axios.post(
      SPRING_API,
      {
        title,
        content,
        userLatitude: 0,
        userLongitude: 0,
        imageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      }
    );

    setIsSubmitting(false);
    setIsSubmitted(true);
  } catch (e) {
    setIsSubmitting(false);
    setError("오류가 발생했습니다. 다시 시도해 주세요.");
    console.error(e);
  }
};

  const handleFinalSubmit = () => {
    localStorage.setItem("postDone", "true");
    navigate("/map");
  };

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="back-arrow" onClick={() => window.history.back()}></div>
        <div className="title">
          {isSubmitting
            ? "이미지 생성중"
            : isSubmitted
            ? "글 등록하기"
            : "글작성하기"}
        </div>
      </div>

      <div
        className="image-box"
        style={{
          backgroundImage: `url(${boxImage})`,
          width: "305px",
          height: "733px",
          margin: "0 auto",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "111px 24px 0",
          boxSizing: "border-box",
        }}
      >
        {isSubmitting ? (
          <div className="loading-section">
            <div className="dot-loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="loading-text">
              추억이 그려지고 있습니다.
              <br />
              조금만 기다려주세요.
            </div>
          </div>
        ) : isSubmitted ? (
          <div className="submit-section">
            <img src={resultImage} alt="result" className="result-image" />
            <div className="submit-text">
              추억이 그려졌습니다.
              <br />
              등록하시겠습니까?
            </div>
            <button className="submit-button" onClick={handleFinalSubmit}>
              등록하기
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="제목"
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="title-underline"></div>

            <div className="date-selector">
              <span onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                {timeType}
              </span>
              <div
                className="arrow"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              ></div>
            </div>

            {isDropdownOpen && (
              <div className="date-options">
                {timeTypes
                  .filter((type) => type !== timeType)
                  .map((type) => (
                    <span
                      key={type}
                      onClick={() => {
                        setTimeType(type);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {type}
                    </span>
                  ))}
              </div>
            )}

            <textarea
              placeholder="본문을 작성해주세요."
              className="body-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {title && content && (
              <button className="submit-button" onClick={handleSubmit}>
                작성하고 추억 확인하기
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Post;


