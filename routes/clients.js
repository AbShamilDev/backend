import express from "express";
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientsController.js";

const router = express.Router();

router.get("/", getAllClients);
router.post("/", createClient);
router.patch("/", updateClient);
router.delete("/", deleteClient);

export default router;
