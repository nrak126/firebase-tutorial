import { useState } from "react";

function PostForm({ onPost }) {
  const [content, setContent] = useState("");

  /**
   * 投稿ボタンを押した時に実行される関数
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onPost(content);
      setContent("");
    }
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今何してる？"
          className="post-textarea"
          rows="3"
        />
        <div className="post-form-footer">
          <span className="char-count">{content.length}/280</span>
          <button
            type="submit"
            className="btn-primary"
            disabled={!content.trim() || content.length > 280}
          >
            投稿する
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
