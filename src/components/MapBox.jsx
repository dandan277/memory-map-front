import React, { useEffect, useRef } from "react";

const MapBox = ({ center = { lat: 37.5665, lng: 126.978 } }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = mapRef.current;
          const options = {
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          const markerPosition = new window.kakao.maps.LatLng(center.lat, center.lng);
          const pouchUrl = new URL("../assets/icons/pouch.png", import.meta.url).href;
          const markerImage = new window.kakao.maps.MarkerImage(
            pouchUrl,
            new window.kakao.maps.Size(36, 36)
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
          });
          marker.setMap(map);

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                const locPosition = new window.kakao.maps.LatLng(lat, lng);

                map.setCenter(locPosition);

                const currentMarker = new window.kakao.maps.Marker({
                  map,
                  position: locPosition,
                  title: "내 위치",
                });
                const circle = new window.kakao.maps.Circle({
                  center: locPosition,
                  radius: 30,
                  strokeWeight: 2,
                  strokeColor: "#007aff",
                  strokeOpacity: 0.8,
                  fillColor: "#cce6ff",
                  fillOpacity: 0.4,
                });
                circle.setMap(map);
              },
              (error) => {
                console.warn("위치 정보를 가져올 수 없습니다.", error);
              }
            );
          } else {
            alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
          }
        });
      }
    };

    script.onerror = () => {
      console.error("Kakao SDK script 로드 실패!");
    };

    document.head.appendChild(script);
  }, [center]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default MapBox;

