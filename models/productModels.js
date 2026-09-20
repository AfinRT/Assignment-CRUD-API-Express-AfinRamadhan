import { db } from "../config/connection.js";

export function formatProduct(row = {}) {
  return {
    ...row,
    title: row.title ?? row.name ?? "",
    thumbnail: row.thumbnail ?? "",
    file_path: row.file_path ?? "",
    status: row.status ?? "",
    category:
      row.category_id == null
        ? { id: null, name: "Tanpa kategori" }
        : { id: row.category_id, name: row.category_name ?? "Kategori" },
  };
}

export async function getAllProducts() {
  const [rows] = await db.execute(`
    SELECT 
      products.*,
      category.id AS category_id,
      category.name AS category_name
    FROM products
    LEFT JOIN category 
      ON category.id = products.productCategoryId
    ORDER BY products.id ASC
  `);

  return rows.map(formatProduct);
}

export async function searchProducts(filters = {}) {
  const {
    name = "",
    categoryId = "",
    minPrice = "",
    maxPrice = "",
    sort = "",
  } = filters;

  const resolvedSort = String(sort || "").trim();
  const nameKeyword = `%${String(name).toLowerCase()}%`;

  let query = `
    SELECT 
      products.*,
      category.id AS category_id,
      category.name AS category_name
    FROM products
    LEFT JOIN category 
      ON category.id = products.productCategoryId
    WHERE LOWER(products.name) LIKE ?
  `;

  const queryParams = [nameKeyword];

  if (categoryId !== "") {
    query += ` AND products.productCategoryId = ?`;
    queryParams.push(Number(categoryId));
  }

  if (minPrice !== "") {
    query += ` AND products.price >= ?`;
    queryParams.push(Number(minPrice));
  }

  if (maxPrice !== "") {
    query += ` AND products.price <= ?`;
    queryParams.push(Number(maxPrice));
  }

  const allowedSorts = {
    "rating:desc": "products.rating DESC",
    "price:asc": "products.price ASC",
    "download_count:desc": "products.download_count DESC",
  };

  if (resolvedSort && allowedSorts[resolvedSort]) {
    query += ` ORDER BY ${allowedSorts[resolvedSort]}`;
  } else {
    query += ` ORDER BY products.id ASC`;
  }

  const [rows] = await db.execute(query, queryParams);

  return rows.map(formatProduct);
}

export async function findProductById(id) {
  const [rows] = await db.execute(
    `SELECT 
      products.*,
      category.id AS category_id,
      category.name AS category_name
    FROM products
    LEFT JOIN category 
      ON category.id = products.productCategoryId
    WHERE products.id = ?`,
    [id],
  );

  return rows[0] ? formatProduct(rows[0]) : null;
}

export async function createProduct(data) {
  const {
    name,
    title,
    price,
    description,
    category_id,
    productCategoryId,
    rating,
    thumbnail,
    file_path,
    userId,
    status,
  } = data;

  const resolvedName = name ?? title ?? "";
  const resolvedCategoryId = category_id ?? productCategoryId ?? null;
  const resolvedThumbnail = thumbnail ?? "";
  const resolvedFilePath = file_path ?? "";

  const [result] = await db.execute(
    `INSERT INTO products (
      name,
      price,
      description,
      productCategoryId,
      rating,
      thumbnail,
      file_path,
      userId,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      resolvedName,
      price,
      description,
      resolvedCategoryId,
      rating ?? 0,
      resolvedThumbnail,
      resolvedFilePath,
      userId ?? 1,
      status ?? "",
    ],
  );

  return findProductById(result.insertId);
}

export async function updateProduct(id, data) {
  const {
    name,
    title,
    price,
    description,
    category_id,
    productCategoryId,
    rating,
    thumbnail,
    file_path,
    userId,
    status,
  } = data;

  const resolvedName = name ?? title ?? "";
  const resolvedCategoryId = category_id ?? productCategoryId ?? null;
  const resolvedThumbnail = thumbnail ?? "";
  const resolvedFilePath = file_path ?? "";

  await db.execute(
    `UPDATE products SET
      name = ?,
      price = ?,
      description = ?,
      productCategoryId = ?,
      rating = ?,
      thumbnail = ?,
      file_path = ?,
      userId = ?,
      status = ?
    WHERE id = ?`,
    [
      resolvedName,
      price,
      description,
      resolvedCategoryId,
      rating ?? 0,
      resolvedThumbnail,
      resolvedFilePath,
      userId ?? 1,
      status ?? "",
      id,
    ],
  );

  return findProductById(id);
}

export async function updateProductPrice(id, price) {
  await db.execute(`UPDATE products SET price = ? WHERE id = ?`, [price, id]);

  return findProductById(id);
}

export async function deleteProduct(id) {
  const [result] = await db.execute(`DELETE FROM products WHERE id = ?`, [id]);

  return result.affectedRows > 0;
}
