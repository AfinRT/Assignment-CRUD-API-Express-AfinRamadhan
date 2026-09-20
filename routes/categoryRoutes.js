import { Router } from "express";
import {
  index,
  show,
  store,
  replace,
  destroy,
} from "../controllers/categoryController.js";
import {
  validateCategory,
  validateId,
} from "../middlewares/categoryValidation.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

router.get("/", index);
router.get("/:id", validateId, validateRequest, show);
router.post("/", validateCategory(), validateRequest, store);
router.put("/:id", validateId, validateCategory(), validateRequest, replace);
router.delete("/:id", validateId, validateRequest, destroy);

export default router;
