import express from "express";
import {
  getAllProjects,
  createProject,
  deleteProject,
} from "../controllers/projectsController.js";

const router = express.Router();

router.get("/", getAllProjects);
router.post("/", createProject);
router.delete("/", deleteProject);

export default router;
