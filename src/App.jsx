import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MapDetail from "./pages/MapDetail";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/login/LoginPage";
import LoginProfilePage from "./pages/login/LoginProfilePage";
import LoginLocationPage from "./pages/login/LoginLocationPage";
import KakaoRedirectPage from "./pages/login/KakaoRedirectPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPosts from "./pages/MyPosts";
import Post from "./pages/Post";
import Notification from "./pages/Notification";
import PostDetail from "./pages/PostDetail";
import Memories from "./pages/Memories";
import MyPageEditable from "./pages/MyPageEditable";

function App() {
  const [storyCount, setStoryCount] = useState(0);

  const handlePostSubmit = () => {
    setStoryCount((prev) => prev + 1);
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/login/profile" element={<LoginProfilePage />}></Route>
      <Route path="/login/location" element={<LoginLocationPage />}></Route>
      <Route
        path="/"
        element={
          // <ProtectedRoute>
          <Home storyCount={storyCount} />
        }
      />
      <Route path="/post" element={<Post onPostSubmit={handlePostSubmit} />} />
      <Route path="/map" element={<MapDetail />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/notification" element={<Notification />} />
      <Route
        path="/kakao-redirect"
        element={<KakaoRedirectPage></KakaoRedirectPage>}
      />
      <Route path="/mypage/posts" element={<MyPosts />}></Route>
      <Route path="/mypage/posts/:idx" element={<PostDetail />}></Route>
      <Route path="/memory-photos" element={<Memories />}></Route>
      <Route path="/pages/editable" element={<MyPageEditable />}></Route>
    </Routes>
  );
}

export default App;
