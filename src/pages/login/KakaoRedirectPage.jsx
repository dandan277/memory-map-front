import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function KakaoRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const error = params.get("error");

    if (error) {
      navigate("/login");
      return;
    }

    if (code) {
      const clientSecret = import.meta.env.VITE_KAKAO_CLIENT_SECRET;
      axios
        .get(
          `http://34.64.144.67/api/v1/auth/kakao/callback?code=${code}&client_secret=${clientSecret}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const { accessToken, refreshToken, isAdditionalInfoRequired } =
            res.data;
          console.log(isAdditionalInfoRequired);
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          if (isAdditionalInfoRequired) {
            navigate("/login/profile");
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          alert("카카오 로그인 실패");
          navigate("/login");
        });
    }
  }, [navigate]);

  return <div>카카오 로그인 중...</div>;
}
