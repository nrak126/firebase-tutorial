function Post({ post, onLike, currentUser }) {
  const likedBy = post.likedBy || [];
  const hasLiked = likedBy.includes(currentUser);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // 秒単位の差

    if (diff < 60) return `${diff}秒前`;
    if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
    return `${Math.floor(diff / 86400)}日前`;
  };

  return (
    <div className="post">
      <div className="post-header">
        {post.photoURL ? (
          <img src={post.photoURL} className="post-author-avatar-img" />
        ) : (
          <div className="post-author-avatar">{post.author.charAt(0)}</div>
        )}
        <div className="post-meta">
          <strong className="post-author">{post.author}</strong>
          <span className="post-time">{formatDate(post.timestamp)}</span>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-actions">
        <button
          onClick={() => onLike(post.id)}
          className={`like-btn ${hasLiked ? "liked" : ""}`}
          title={hasLiked ? "いいねを取り消す" : "いいね"}
        >
          {hasLiked ? "❤️" : "🤍"} {post.likes > 0 && post.likes}
        </button>
      </div>
    </div>
  );
}

export default Post;
