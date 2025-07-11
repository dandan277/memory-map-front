import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken"); // 인증 여부 체크
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);
  if (!isLoggedIn) return null;
  return children;
}
