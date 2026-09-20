import {
  createProduct,
  searchProducts,
  updateProduct,
  updateProductPrice,
  deleteProduct,
  findProductById,
} from "../models/productModels.js";

export async function index(req, res) {
  try {
    const name = req.query.search ?? req.query.name ?? "";
    const categoryId = req.query.category_id ?? "";
    const minPrice = req.query.min_price ?? "";
    const maxPrice = req.query.max_price ?? "";
    const sort = req.query.sort ?? "";
    const sortBy = req.query.sort_by ?? "";
    const order = req.query.order ?? "";
    const normalizedSort =
      sort || (sortBy && order ? `${sortBy}:${order}` : "");

    const products = await searchProducts({
      name,
      categoryId,
      minPrice,
      maxPrice,
      sort: normalizedSort,
    });

    return res.status(200).json({
      success: true,
      message: "Data produk berhasil diambil",
      data: products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function show(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID produk tidak valid.",
      });
    }

    const product = await findProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function store(req, res) {
  try {
    const data = req.body;
    const product = await createProduct(data);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function replace(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID produk tidak valid.",
      });
    }

    const data = req.body;

    const product = await updateProduct(id, data);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function patchPrice(req, res) {
  try {
    const id = Number(req.params.id);
    const { price } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID produk tidak valid.",
      });
    }

    const product = await updateProductPrice(id, Number(price));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
}

export async function destroy(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID produk tidak valid.",
      });
    }

    const deleted = await deleteProduct(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
}
