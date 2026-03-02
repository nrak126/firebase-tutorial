import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Timeline from "./components/Timeline";
import PostForm from "./components/PostForm";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, provider, db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  /**
   * 投稿一覧を取得する関数
   */
  const fetchPosts = async () => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const postsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postsData);
  };

  /**
   * ↓このページを開いた時に一度だけ実行されるところ
   * 認証状態の監視と投稿一覧の取得
   */
  useEffect(() => {
    // 認証状態の監視
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchPosts(); // ログインしたら投稿を取得
      }
    });

    // クリーンアップ関数
    return () => {
      unsubscribeAuth();
    };
  }, []);

  /**
   * ログインした時に実行される関数
   *
   */
  const handleLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      setCurrentUser(result.user);
    });
  };

  /**
   * ログアウトした時に実行される関数
   */
  const handleLogout = () => {
    signOut(auth).then(() => {
      setCurrentUser(null);
    });
  };

  /**
   * 投稿した時に呼ばれる関数
   * @param {*} content
   */
  const handlePost = async (content) => {
    if (!currentUser) return;

    try {
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        content: content,
        author: currentUser.displayName || currentUser.email,
        authorId: currentUser.uid,
        photoURL: currentUser.photoURL || null,
        timestamp: new Date().toISOString(),
        likes: 0,
        likedBy: [],
      });
      // 投稿後に一覧を再取得
      await fetchPosts();
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました");
    }
  };

  /**
   * いいねした時に呼ばれる関数
   * @param {*} postId
   */
  const handleLike = async (postId) => {
    if (!currentUser) return;

    try {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) return;

      const likedBy = postDoc.data().likedBy || [];
      const hasLiked = likedBy.includes(currentUser.uid);

      await updateDoc(postRef, {
        likes: increment(hasLiked ? -1 : 1),
        likedBy: hasLiked
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid),
      });
      // いいね後に一覧を再取得
      await fetchPosts();
    } catch (error) {
      console.error("いいねエラー:", error);
    }
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>シンプルSNS</h1>
        <div className="user-info">
          <span>ようこそ、{currentUser.displayName}さん</span>
          <img src={currentUser.photoURL} className="avatar" />
          <button onClick={handleLogout} className="logout-btn">
            ログアウト
          </button>
        </div>
      </header>
      <main className="main-content">
        <PostForm onPost={handlePost} />
        <Timeline posts={posts} onLike={handleLike} currentUser={currentUser} />
      </main>
    </div>
  );
}

export default App;
