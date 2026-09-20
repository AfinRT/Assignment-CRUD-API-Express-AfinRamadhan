import { body, param } from "express-validator";

export const titleRules = () => {
  return body("title")
    .isString()
    .withMessage("Title harus berupa string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Title tidak boleh kosong.")
    .bail()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title harus memiliki panjang antara 2 dan 100 karakter.");
};

export const descriptionRules = () => {
  return body("description")
    .isString()
    .withMessage("Description harus berupa string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Description tidak boleh kosong.")
    .bail()
    .isLength({ min: 10, max: 200 })
    .withMessage(
      "Description harus memiliki panjang antara 10 dan 200 karakter.",
    );
};

export const thumbnailRules = () => {
  return body("thumbnail")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Thumbnail harus berupa URL string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Thumbnail tidak boleh kosong.");
};

export const filePathRules = () => {
  return body("file_path")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("File path harus berupa string.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("File path tidak boleh kosong.");
};

export const statusRules = () => {
  return body("status")
    .optional({ checkFalsy: true })
    .isIn(["active", "inactive", "draft", "published"])
    .withMessage("Status tidak valid.");
};

export const categoryRules = () => {
  return body("category_id")
    .notEmpty()
    .withMessage("Kategori wajib dipilih.")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Kategori tidak valid.");
};

export const ratingRules = () => {
  return body("rating")
    .notEmpty()
    .withMessage("Rating tidak boleh kosong.")
    .bail()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating harus berupa angka antara 0 sampai 10.");
};

export const priceRules = () => {
  return body("price")
    .custom((value) => typeof value === "number" && Number.isFinite(value))
    .withMessage("Price harus berupa angka positif.")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price minimal 0.");
};

const objectRule = () =>
  body()
    .custom(
      (value) =>
        value !== null && typeof value === "object" && !Array.isArray(value),
    )
    .withMessage("Body harus berupa object JSON.");

export const validateProduct = () => [
  objectRule(),
  titleRules(),
  descriptionRules(),
  categoryRules(),
  ratingRules(),
  priceRules(),
  thumbnailRules(),
  filePathRules(),
  statusRules(),
];

export const validatePricePatch = () => [
  objectRule(),
  priceRules(),
  body()
    .custom(
      (value) => value && Object.keys(value).every((key) => key === "price"),
    )
    .withMessage("PATCH pada API ini hanya menerima field price."),
];

export const validateId = param("id")
  .custom(
    (value) => /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value)),
  )
  .withMessage("ID harus berupa bilangan bulat positif.");
