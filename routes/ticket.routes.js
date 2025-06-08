import express from "express";
import { authenticate } from "./../middlewares/auth.middleware.js";
import { createTicket, getTickets } from "../controllers/ticket.controller.js";
import { getTicket } from "./../controllers/ticket.controller.js";

const router = express.Router();

router.get("/", authenticate, getTickets);
router.get("/:id", authenticate, getTicket);
router.post("/", authenticate, createTicket);

export default router;
