// Required modules
const mongoose = require("mongoose");

// Schema
const PostScheme = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
  },

  idCategory: {
    type: String,
    required: true,
  },

  banner: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  info: {
    type: Array,
    required: true,
  },
});

class Post {
  constructor() {
    this.Post = mongoose.model("Post", PostScheme);
  }

  async delete(params) {
    const { id, idUser, idCategory } = params;
    if (id) await this.Post.findByIdAndDelete(id);
    if (idUser) await this.Post.deleteMany({ idUser });
    if (idCategory) await this.Post.deleteMany({ idCategory });
  }

  async update(id, newPost) {
    return await this.Post.findByIdAndUpdate(
      id,
      { $set: newPost },
      { $new: true }
    );
  }

  async get(params) {
    const { id } = params;
    if (id) return await this.Post.findById(id);
    return await this.Post.find(params);
  }

  create(credentials) {
    const newPost = new this.Post(credentials);
    const post = newPost.save();
    return post;
  }
}

module.exports = Post;
