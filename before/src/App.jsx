import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Timeline from "./components/Timeline";
import PostForm from "./components/PostForm";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "サンプルユーザー",
      content: "これはサンプル投稿です！",
      timestamp: new Date().toISOString(),
    },
  ]);

  /**
   * ↓このページを開いた時に一度だけ実行されるところ
   */
  useEffect(() => {}, []);

  /**
   * ログインした時に実行される関数
   * @param {*} username
   */
  const handleLogin = () => {
    setCurrentUser("gest");
  };

  /**
   * ログアウトした時に実行される関数
   */
  const handleLogout = () => {
    setCurrentUser(null);
  };

  /**
   * 投稿した時に呼ばれる関数
   * @param {*} content
   */
  const handlePost = (content) => {
    const newPost = {
      id: posts.length + 1,
      author: currentUser,
      content: content,
      timestamp: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
  };

  if (!currentUser) {
    return <Login handleLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>シンプルSNS</h1>
        <div className="user-info">
          <span>ようこそ、{currentUser}さん</span>
          <img src={`url`} className="user-avatar" />
          <button onClick={handleLogout} className="logout-btn">
            ログアウト
          </button>
        </div>
      </header>
      <main className="main-content">
        <PostForm onPost={handlePost} />
        <Timeline posts={posts} />
      </main>
    </div>
  );
}

export default App;
