import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  findCategoryById,
} from "../models/categoryModels.js";

export async function index(req, res) {
  try {
    const categories = await getAllCategories();
    res.status(200).json({
      success: true,
      message: "Data kategori berhasil diambil",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data kategori",
    });
  }
}

export async function show(req, res) {
  try {
    const id = Number(req.params.id);
    const category = await findCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil kategori",
    });
  }
}

export async function store(req, res) {
  try {
    const { name, description } = req.body;

    const category = await createCategory({
      name: String(name).trim(),
      description: String(description).trim(),
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat kategori",
    });
  }
}

export async function replace(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    const category = await updateCategory(id, {
      name: String(name).trim(),
      description: String(description).trim(),
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengubah kategori",
    });
  }
}

export async function destroy(req, res) {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteCategory(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus kategori",
    });
  }
}
