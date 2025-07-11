import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/downarrow.png";

export default function LoginLocationPage() {
  const APP_KEY = import.meta.env.VITE_KAKAO_MAPS_API_KEY;
  const [address, setAddress] = useState("");
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();
  const { username = "", age = "" } = location.state || {};
  const mapRef = useRef(null);
  let navigate = useNavigate();
  useEffect(() => {
    let script;

    function onKakaoMapLoaded() {
      window.kakao.maps.load(() => {
        if (!window.kakao.maps.services) {
          setError("카카오 지도 서비스가 준비되지 않았습니다.");
          return;
        }
        if (!navigator.geolocation) {
          setError("이 브라우저는 위치 정보를 지원하지 않습니다.");
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLatitude(lat);
            setLongitude(lng);
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(lng, lat, (result, status) => {
              if (
                status === window.kakao.maps.services.Status.OK &&
                result[0]
              ) {
                const fullAddress = result[0].address_name;
                const shortAddress = fullAddress
                  .split(" ")
                  .slice(0, 2)
                  .join(" ");
                setAddress(shortAddress);
              } else {
                setError("주소 변환에 실패했습니다.");
              }
            });

            // 지도 생성 및 마커 표시
            if (mapRef.current) {
              const mapOption = {
                center: new window.kakao.maps.LatLng(lat, lng),
                level: 3,
              };
              const map = new window.kakao.maps.Map(mapRef.current, mapOption);
              new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(lat, lng),
                map: map,
              });
            }
          },
          (err) => {
            setError("위치 정보 에러: " + err.message);
          }
        );
      });
    }

    if (!window.kakao || !window.kakao.maps) {
      script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = onKakaoMapLoaded;
      document.head.appendChild(script);
    } else {
      onKakaoMapLoaded();
    }

    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [APP_KEY]);

  return (
    <div className="w-screen h-screen bg-Background flex flex-col">
      <div className="p-2 mt-6 ml-1 flex-low flex">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <img src={arrow} alt="icon" className="w-15 h-15 -mt-4" />
        </button>
        <h2 className="text-2xl font-bold mt-1 ">위치 정보 등록하기</h2>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="mt-3">
        <div
          ref={mapRef}
          id="map"
          style={{ width: "100%", height: "400px" }}
        ></div>
        <div
          className="flex justify-center items-center m-6 p-5 bg-[#393A43] text-white shadow-md backdrop-blur-sm border-white p-4 rounded-xl "
          style={{ borderWidth: "0.5px" }}
        >
          현재 위치가 '<span className="text-bold text-xl">{address}</span>
          '내에 있어요.
        </div>
        <div className="flex flex-low justify-center">
          <button
            className="fixed bottom-5 m-5 px-20 p-5 text-white text-sm rounded-xl border-none
             bg-gray-400 shadow-[inset_-8px_-8px_17px_rgba(0,0,0,0.7)]"
            onClick={() =>
              navigate("/login/profile", {
                state: { username, age, address },
              })
            }
          >
            위치 인증 완료하기
          </button>
        </div>
      </div>
    </div>
  );
}
