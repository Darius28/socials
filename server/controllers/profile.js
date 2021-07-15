import User from "../models/user";
import AWS from "aws-sdk";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const completeProfile = async (req, res) => {
  try {
    // console.log("req.params", req.params);
    // console.log("req.body", req.body);
    const { name, bio, website } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, {
      name,
      bio,
      website,
    }).exec();
    console.log(user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const getProfileDetails = async (req, res) => {
  try {
    //   console.log("req.user", req.user)
    const user = await User.findById(req.user.id).select("-password").exec();
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
};
