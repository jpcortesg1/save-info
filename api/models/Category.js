// Required modules
const mongoose = require("mongoose");

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
    if (idUser) await this.Category.deleteMany(idUser);
    if (id) await this.Category.findByIdAndDelete(id);
  }

  async update(id, category) {
    await this.Category.findByIdAndUpdate(id, { $set: category });
  }

  async get(param) {
    const { id } = param;
    return await this.Category.findById(id);
  }

  async create(category) {
    const newCategory = new this.Category(category);
    return newCategory.save();
  }
}

module.exports = Category;
