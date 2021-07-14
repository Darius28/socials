import Post from "../models/posts";
import User from "../models/user";

export const postNewPost = async (req, res) => {
  try {
    // console.log("req.user", req.user.id);
    // console.log(req.body);
    const post = await new Post({
      userId: req.user.id,
      content: req.body.thought,
    }).save();
    // console.log(post);
    // res.json({ ok: true, postedAt: post.createdAt });
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

export const getPosts = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const posts = await Post.find({ userId: req.user.id });
    // console.log(posts);
    return res.send({ posts, name: user.name });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
