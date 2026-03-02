import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  /**
   * ログインボタンを押した時に呼ばれる関数
   * @param {*} e
   */
  const handleLogin = () => {
    onLogin(username);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>シンプルSNS</h1>
        <p className="login-subtitle">ようこそ！ログインしてください</p>
        <button className="btn-primary" onClick={handleLogin}>
          ログイン
        </button>
      </div>
    </div>
  );
}

export default Login;
