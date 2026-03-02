import Post from "./Post";

function Timeline({ posts, onLike, currentUser }) {
  return (
    <div className="timeline">
      <h2>タイムライン</h2>
      <div className="posts-container">
        {posts.length === 0 ? (
          <p className="no-posts">まだ投稿がありません</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={onLike}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Timeline;
