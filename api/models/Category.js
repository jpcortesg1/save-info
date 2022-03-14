// Required modules
const mongoose = require("mongoose");

// Required class
const classPost = require("./Post");

// Object
const Post = new classPost();

const CategorySechema = mongoose.Schema(
  {
    idUser: {
      required: true,
      type: String,
    },

    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

class Category {
  constructor() {
    this.Category = mongoose.model("Cateogry", CategorySechema);
  }

  async delete(id, idUser) {
    if (idUser) {
      await this.Category.deleteMany(idUser);
      await Post.delete({ idUser });
    }
    if (id) {
      await this.Category.findByIdAndDelete(id);
      await Post.delete({ idCategory: id });
    }
  }

  async update(id, category) {
    await this.Category.findByIdAndUpdate(id, { $set: category });
  }

  async get(param) {
    const { id, idUser } = param;
    if (idUser) return await this.Category.find({ idUser });
    return await this.Category.findById(id);
  }

  async create(category) {
    const newCategory = new this.Category(category);
    return newCategory.save();
  }
}

module.exports = Category;
