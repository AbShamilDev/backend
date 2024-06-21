import express from "express";
import {
  getAllInstallations,
  createInstallation,
  updateInstallation,
  deleteInstallation,
} from "../controllers/installationsController.js";

const router = express.Router();

router.get("/", getAllInstallations);
router.post("/", createInstallation);
router.patch("/", updateInstallation);
router.delete("/", deleteInstallation);

export default router;
