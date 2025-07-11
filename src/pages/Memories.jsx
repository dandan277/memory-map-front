import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FlipCard from "../components/FlipCard";

export default function Memories() {
  const [photos, setPhotos] = useState([
    "asd",
    "asdas",
    "asd",
    "asdas",
    "asd",
    "asdas",
  ]);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // 모달용 상태
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    axios
      .get("http://34.64.144.67/api/v1/picture", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Refresh-Token": refreshToken,
        },
      })
      .then((res) => {
        setPhotos(res.data.pictures);
      })
      .catch((err) => {
        alert("사진을 불러오지 못했습니다.");
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
          <p className="font-bold text-2xl ml-2">내 추억의 사진들</p>
        </div>
        <div className="h-[700px] mt-10 rounded-xl w-80 bg-gradient-to-t from-[#493F5D] via-[#282635] to-[#16161B] border mx-auto flex flex-wrap justify-center items-start overflow-y-auto p-2 gap-x-6">
          {photos.map((photo, idx) => (
            <>
              <div
                key={idx}
                onClick={() => setSelectedPhoto(photo.imageUrl)}
                className="w-[45px] h-[45px]  bg-white rounded-lg flex items-center -mb-2 justify-center shadow-md"
              >
                <img
                  src={photo.imageUrl}
                  className="w-[45px] h-[45px] object-cover rounded-md cursor-pointer"
                />
              </div>
            </>
          ))}
        </div>
        {selectedPhoto && (
          <>
            <FlipCard
              onClose={() => setSelectedPhoto(null)}
              description={"hello"} //여기에 뒷면 들어갈거
            >
              <img
                src={selectedPhoto}
                className="w-full h-full object-cover rounded-lg"
              />
            </FlipCard>
          </>
        )}
      </div>
    </div>
  );
}
