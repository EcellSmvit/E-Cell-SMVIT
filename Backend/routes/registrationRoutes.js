// routes/registrationRoutes.js
import express from "express";
import { createRegistration, getRegistrationsForEvent } from "../controllers/registrationController.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

// Create a registration (only logged-in users)
router.post("/event", userAuth, createRegistration);

// Admin/organizer: get registrations for an event (protected)
router.get("/event/:eventId", userAuth, getRegistrationsForEvent);

export default router;
