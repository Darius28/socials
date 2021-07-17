import express from "express";
import {
  completeProfile,
  getProfileDetails,
  uploadProfilePic,
  getProfilePic,
} from "../controllers/profile";
import { validJwt } from "../middleware";
const router = express.Router();

router.post("/profile/:userId/complete-profile", validJwt, completeProfile);
router.get("/profile/get-profile-details", validJwt, getProfileDetails);
router.post("/profile/upload-profile-pic", uploadProfilePic);
router.get("/profile/get-profile-pic", validJwt, getProfilePic);

module.exports = router;
