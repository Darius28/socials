import express from "express";
import { completeProfile, getProfileDetails } from "../controllers/profile";
import { validJwt } from "../middleware";
const router = express.Router();

router.post("/profile/:userId/complete-profile", validJwt, completeProfile)
router.get("/profile/get-profile-details", validJwt, getProfileDetails)

module.exports = router;
