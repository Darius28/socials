import express from "express";
import { postNewPost, getPosts } from "../controllers/post";
import { validJwt } from "../middleware";
const router = express.Router();

router.post("/post-new-post", validJwt, postNewPost);
router.get("/post/:userId/get-posts", validJwt, getPosts);

module.exports = router;
