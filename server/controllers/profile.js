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

export const completeProfile = async (req, res) => {
  try {
    // console.log("req.params", req.params);
    // console.log("req.body", req.body);
    const { name, bio, website, profile_pic } = req.body;
    console.log("PROFILE_PIC: ", profile_pic);
    const user = await User.findByIdAndUpdate(req.params.userId, {
      name,
      bio,
      website,
      profile_pic,
    }).exec();
    console.log("USER: ", user);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const getProfileDetails = async (req, res) => {
  try {
    //   console.log("req.user", req.user)
    const user = await User.findById(req.user.id).select("-password").exec();
    console.log(user);
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    const { image, prevImage } = req.body;
    // console.log("img details: ", image);
    console.log("prev img details: ", prevImage);
    if (!image) {
      return res.status(400).send("No image found.");
    }

    if (prevImage) {
      const oldImgParams = {
        Bucket: prevImage.Bucket,
        Key: prevImage.Key,
      };

      S3.deleteObject(oldImgParams, (err, data) => {
        if (err) {
          console.log(err);
          // return res.sendStatus(400);
        }
        // res.send({ ok: true });
      });
    }

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    const params = {
      Bucket: "socials-2828",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log(data);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).exec();
    // console.log("GET PROFILE PIC  ====>> ", user.profile_pic);
    res.send({ profilePic: user.profile_pic });
  } catch (err) {
    console.log(err);
  }
};
