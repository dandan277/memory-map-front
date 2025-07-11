import axios from "axios";

export default function GoogleBtn() {
  const handleGoogleLogin = async () => {
    try {
      const res = await axios.post(
        "http://map-of-memory.com/oauth2/authorization/google"
      );
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // 필요하다면 로그인 후 이동
      window.location.href = "/";
    } catch (err) {
      alert("구글 로그인 실패");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-black px-4 py-2 rounded shadow mt-4"
    >
      구글로 로그인
    </button>
  );
}
