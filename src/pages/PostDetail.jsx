import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/MyPage.css";
import { FaArrowLeft } from "react-icons/fa";
import silverbtn from "../assets/images/SilverBar.png";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";

export default function PostDetail() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { post } = state || {};

  // 수정 모드 상태와 content 상태 추가
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState(post?.content || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!post) return <div>데이터가 없습니다.</div>;

  return (
    <div className="mypage-container flex flex-col flexd justify-between ">
      <div>
        <div className="flex flex-low fixed top-10 justify-between items-center">
          <div className="flex items-center -mt-2">
            <FaArrowLeft
              size={21}
              className="mt-1"
              onClick={() => {
                navigate(-1);
              }}
            />
            <p className="font-bold text-2xl ml-2">수정하기</p>
          </div>
          {isEdit && (
            <div
              className="ml-5 bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() => setShowDeleteModal(true)}
            >
              삭제
            </div>
          )}
        </div>
        <div className="my-2 p-2 border-b flex justify-between">
          <div className="font-bold text-3xl mt-2">{post.title}</div>
          <div className="text-sm text-white mt-8">{post.address}</div>
        </div>
        <div>
          {isEdit ? (
            <textarea
              className="w-full p-2 bg-transparent border-none focus:outline-none resize-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={5}
            />
          ) : (
            post.content
          )}
        </div>
      </div>
      {isEdit ? (
        <button
          onClick={() => {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");
            axios
              .put(
                `http://34.64.144.67/api/v1/posts/posts/1`, // 실제 post id로 변경 필요
                { content: editContent }, // 수정할 내용
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Refresh-Token": refreshToken,
                  },
                }
              )
              .then(() => {
                setIsEdit(false);
                alert("수정이 완료되었습니다.");
                navigate(-1);
              })
              .catch((err) => {
                alert("수정에 실패했습니다.");
                console.error(err);
              });
          }}
          className="relative inline-block p-0 border-none bg-transparent"
          style={{ width: "auto", height: "auto" }}
        >
          <img src={silverbtn} className="p-3 m-3 rounded-xl" />
          <span
            className="absolute inset-0 flex items-center justify-center font-bold text-lg text-black"
            style={{ pointerEvents: "none" }}
          >
            완료하기
          </span>
        </button>
      ) : (
        <button
          onClick={() => setIsEdit(true)}
          className="relative inline-block p-0 border-none bg-transparent"
          style={{ width: "auto", height: "auto" }}
        >
          <img src={silverbtn} className="p-3 m-3 rounded-xl" />
          <span
            className="absolute inset-0 flex items-center justify-center font-bold text-lg text-black"
            style={{ pointerEvents: "none" }}
          >
            수정하기
          </span>
        </button>
      )}
      <DeleteModal
        open={showDeleteModal}
        message="정말 삭제하시겠습니까?"
        onConfirm={() => {
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");
          axios
            .delete("http://34.64.144.67/api/v1/posts/posts/1", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Refresh-Token": refreshToken,
              },
            })
            .then(() => {
              setShowDeleteModal(false);
              navigate(-1);
            })
            .catch((err) => {
              alert("삭제에 실패했습니다.");
              setShowDeleteModal(false);
              console.error(err);
            });
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
