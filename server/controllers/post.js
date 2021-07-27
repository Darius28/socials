import Post from "../models/posts";
import User from "../models/user";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const postNewPost = async (req, res) => {
  try {
    // console.log("req.user", req.user.id);
    // console.log(req.body);
    // console.log(req.body);

    if (req.body.postPic) {
      let awsPicDataObj = {};
      console.log("post with pic");
      const { postPic } = req.body;
      const base64Data = new Buffer.from(
        postPic.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const type = postPic.split(";")[0].split("/")[1];
      const params = {
        Bucket: "socials-2828",
        Key: `${nanoid()}.${type}`,
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };

      S3.upload(params, async (err, data) => {
        console.log("S3 upload func");
        if (err) {
          console.log(err);
          return res.sendStatus(400);
        }
        console.log("datadata", data);
        if (data) {
          console.log("data to be sent: ", data);
          const post = await new Post({
            userId: req.user.id,
            content: req.body.thought,
            picture: data,
          }).save();
          res.send({ ok: true });
        }
      });
      // const post = await new Post({
      //   userId: req.user.id,
      //   content: req.body.thought,
      //   picture: data,
      // }).save();
    } else {
      console.log("post without pic");
      const post = await new Post({
        userId: req.user.id,
        content: req.body.thought,
      }).save();
      res.send({ ok: true });
      // console.log(post);
      // res.json({ ok: true, postedAt: post.createdAt });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

export const getPosts = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    const posts = await Post.find({ userId: req.params.userId });
    // console.log(posts);
    // console.log("user data: ", user);
    // console.log("posts data: ", posts);
    return res.send({ posts, name: user.name });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
