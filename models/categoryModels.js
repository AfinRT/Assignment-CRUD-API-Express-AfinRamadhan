import { db } from "../config/connection.js";
import { formatProduct } from "./productModels.js";

async function getCategoryColumns() {
  const [columns] = await db.execute("SHOW COLUMNS FROM category");
  return columns.map((column) => column.Field);
}

function normalizeCategory(row = {}) {
  return {
    ...row,
    description: row.description ?? "Belum ada deskripsi.",
  };
}

export async function getAllCategories() {
  const [rows] = await db.execute(
    "SELECT id, name, description, createdAt, updatedAt FROM category ORDER BY id ASC",
  );
  return rows.map(normalizeCategory);
}

export async function findCategoryById(id) {
  const [categoryRows] = await db.execute(
    "SELECT id, name, description, createdAt, updatedAt FROM category WHERE id = ?",
    [id],
  );

  const category = categoryRows[0];
  if (!category) return null;

  const [productRows] = await db.execute(
    `SELECT p.*, c.id AS category_id, c.name AS category_name
     FROM products p
     LEFT JOIN category c ON c.id = p.productCategoryId
     WHERE p.productCategoryId = ?
     ORDER BY p.id ASC`,
    [id],
  );

  return {
    ...normalizeCategory(category),
    products: productRows.map(formatProduct),
  };
}

export async function createCategory(payload = {}) {
  const columns = await getCategoryColumns();
  const name = payload.name ?? "";
  const description = payload.description ?? "";

  if (columns.includes("description")) {
    const [result] = await db.execute(
      "INSERT INTO category (name, description) VALUES (?, ?)",
      [name, description],
    );
    return findCategoryById(result.insertId);
  }

  const [result] = await db.execute("INSERT INTO category (name) VALUES (?)", [
    name,
  ]);
  return findCategoryById(result.insertId);
}

export async function updateCategory(id, payload = {}) {
  const columns = await getCategoryColumns();
  const name = payload.name ?? undefined;
  const description = payload.description ?? undefined;

  if (
    name !== undefined &&
    columns.includes("description") &&
    description !== undefined
  ) {
    await db.execute(
      "UPDATE category SET name = ?, description = ? WHERE id = ?",
      [name, description, id],
    );
    return findCategoryById(id);
  }

  if (name !== undefined) {
    await db.execute("UPDATE category SET name = ? WHERE id = ?", [name, id]);
    return findCategoryById(id);
  }

  return findCategoryById(id);
}

export async function deleteCategory(id) {
  const [result] = await db.execute("DELETE FROM category WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
