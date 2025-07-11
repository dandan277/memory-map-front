import { useEffect, useState } from "react";
import "../styles/MyPage.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    axios
      .get(`http://34.64.144.67/api/v1/posts/members/1/posts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Refresh-Token": refreshToken,
        },
      })
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        alert("내 글 목록을 불러오지 못했습니다.");
        console.error(err);
      });
  }, []);
  return (
    <div className="mypage-container">
      <div className="flex flex-col">
        <div className="flex flex-low fixed top-10">
          <FaArrowLeft
            size={21}
            className="mt-1"
            onClick={() => {
              navigate(-1);
            }}
          />
          <p className="font-bold text-2xl ml-2 ">내가 쓴 글</p>
        </div>
        <div>
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="my-2 p-2 border-b flex justify-between"
              onClick={() => {
                navigate(`/mypage/posts/${idx}`, { state: { post } });
              }}
            >
              <div className="font-bold text-2xl mt-2">{post.title}</div>
              <div className="text-sm text-white mt-8">{post.address}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
