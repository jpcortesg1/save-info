import "./post.css";

const Post = ({ post }) => {
  const PF = process.env.REACT_APP_PF;
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postBanner">
          <img
            src={post?.banner ? PF + post.banner : PF + "/book.png"}
            alt=""
            className="postImage"
          />
        </div>
        <div className="postTitle">
          <h3 className="postText">{post.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
