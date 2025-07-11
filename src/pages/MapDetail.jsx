import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MapBox from "../components/MapBox";
import HeaderBar from "../components/HeaderBar";
import LocationBanner from "../components/LocationBanner";
import DraggableMarker from "../components/DraggableMarker";
import RegisterModal from "../components/RegisterModal";
import DetailBox from "../components/DetailBox";
import BottomNavBar from "../components/BottomNavBar";

import pouch from "../assets/icons/pouch.png";
import map2 from "../assets/icons/map2.png";

function MapDetail() {
  const navigate = useNavigate();
  const [map2MarkerVisible, setMap2MarkerVisible] = useState(false);
  const [pouchMarkerVisible, setPouchMarkerVisible] = useState(true);
  const [map2MarkerPosition, setMap2MarkerPosition] = useState({
    x: 150,
    y: 300,
  });
  const [pouchMarkerPosition, setPouchMarkerPosition] = useState({
    x: 250,
    y: 300,
  });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailBox, setShowDetailBox] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [latitude, setLatitude] = useState(null); 
  const [longitude, setLongitude] = useState(null); 

  const uiseong = { lat: 36.351, lng: 128.6975 };

  const handleMapClick = (e) => {
    if (!map2MarkerVisible) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      setMap2MarkerPosition({ x: clickX - 25, y: clickY - 25 });
      setMap2MarkerVisible(true);
    }
  };

  const handleDrag = (setPosition) => (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.parentNode.getBoundingClientRect();
    const dragX = clientX - rect.left;
    const dragY = clientY - rect.top;
    setPosition({ x: dragX - 25, y: dragY - 25 });
  };

  const sendLocationToServer = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token || !latitude || !longitude || !currentAddress) {
      console.warn("위치 정보 또는 토큰이 누락되었습니다.");
      return;
    }

    try {
      await axios.post(
        "http://34.64.144.67/api/v1/location/save",
        {
          latitude,
          longitude,
          address: currentAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("위치 서버 전송 성공");
    } catch (error) {
      console.error("위치 서버 전송 실패:", error);
    }
  };

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude); 
        setLongitude(longitude); 

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(longitude, latitude, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            setCurrentAddress(address);

            setTimeout(() => {
              sendLocationToServer();
            }, 300);
          }
        });
      },
      (error) => {
        console.error("위치 정보를 가져오지 못했습니다.", error);
      }
    );
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        backgroundColor: "#EDEDED",
        overflow: "hidden",
      }}
      onClick={handleMapClick}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <MapBox center={uiseong} />
      </div>

      <HeaderBar navigate={navigate} />
      <LocationBanner navigate={navigate} pouch={pouch} count={5} />

      {pouchMarkerVisible && (
        <DraggableMarker
          icon={pouch}
          position={pouchMarkerPosition}
          onClick={() => {
            setShowDetailBox(true);
            setShowRegisterModal(false);
          }}
          onDrag={handleDrag(setPouchMarkerPosition)}
        />
      )}

      {map2MarkerVisible && (
        <DraggableMarker
          icon={map2}
          position={map2MarkerPosition}
          onClick={() => {
            setShowRegisterModal(true);
            setShowDetailBox(false);
          }}
          onDrag={handleDrag(setMap2MarkerPosition)}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          currentAddress={currentAddress}
          onConfirm={() => {
            navigate("/post");
            setShowRegisterModal(false);
          }}
        />
      )}

      {showDetailBox && <DetailBox />}

      <div
        style={{
          position: "fixed",
          left: "41px",
          top: "779px",
          width: "321px",
          height: "62px",
          zIndex: 100,
        }}
      >
        <BottomNavBar />
      </div>
    </div>
  );
}

export default MapDetail;
