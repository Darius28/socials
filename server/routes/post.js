import express from "express";
import { postNewPost, getPosts, likePost } from "../controllers/post";
import { validJwt } from "../middleware";
const router = express.Router();

router.post("/post-new-post", validJwt, postNewPost);
router.get("/post/:userId/get-posts", validJwt, getPosts);
router.post("/post/:userId/:postId/like-post", validJwt, likePost);

module.exports = router;
