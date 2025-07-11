import kakao_logo from "../assets/icons/kakao_login_original.png";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

function getKakaoAuthUrl() {
  return (
    `https://kauth.kakao.com/oauth/authorize?` +
    `client_id=${KAKAO_REST_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
    `&response_type=code`
  );
}

export default function KakaoBtn() {
  const handleLogin = () => {
    window.location.href = getKakaoAuthUrl();
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleLogin}
        className="w-full p-4 m-10  bg-yellow-300 rounded-3xl font-bold"
      >
        <div className="flex justify-center text-black">
          <img src={kakao_logo} alt="카카오 로고" className="w-6 h-6 mr-2" />
          카카오로 시작하기
        </div>
      </button>
    </div>
  );
}
