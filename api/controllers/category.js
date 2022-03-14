// Class
const Category = require("./../models/Category");

// Object
const category = new Category();

// Delete
const deleteCategory = async (req, res) => {
  try {
    const { id: idUser } = req.user;
    const { id } = req.body;

    const categoryBody = await category.get({ id });
    if (!categoryBody.idUser === idUser)
      return res.status(401).json("You can only delete your categories");

    await category.delete(id);
    res.status(200).json("The category has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update category
const update = async (req, res) => {
  try {
    const { id: idUser } = req.user;
    const { id, name } = req.body;
    if (!id || !name) return res.status(404).json("Invalid parameters");

    const categoryBody = await category.get({ id });
    if (!categoryBody.idUser === idUser)
      return res.status(401).json("You can only update your categories");

    await category.update(id, { name });
    const retCategory = await category.get({ id });
    res.status(200).json(retCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create category
const create = async (req, res) => {
  try {
    const { id: idUser } = req.user;
    const { name } = req.body;
    const newCategory = {
      idUser,
      name,
    };
    const categoryCreate = await category.create(newCategory);
    res.status(200).json(categoryCreate);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
  update,
  deleteCategory,
};