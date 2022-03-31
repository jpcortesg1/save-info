import "./post.css";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postBanner">
          <img
            src="https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
