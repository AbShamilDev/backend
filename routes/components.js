import express from "express";
import {
  getAllComponents,
  createComponent,
  updateComponent,
  deleteComponent,
} from "../controllers/componentsController.js";

const router = express.Router();

router.get("/", getAllComponents);
router.post("/", createComponent);
router.patch("/", updateComponent);
router.delete("/", deleteComponent);

export default router;
