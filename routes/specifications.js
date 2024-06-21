import express from "express";
import {
  getAllSpecifications,
  createSpecification,
  updateSpecification,
  deleteSpecification,
} from "../controllers/specificationsController.js";

const router = express.Router();

router.get("/", getAllSpecifications);
router.post("/", createSpecification);
router.patch("/", updateSpecification);
router.delete("/", deleteSpecification);

export default router;
