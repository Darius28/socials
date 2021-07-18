import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    if (password !== cpassword) {
      return res.status(400).send("Passwords don't match.");
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send("User already exists.");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found.");
    }
    const matchingPassword = await comparePassword(password, user.password);
    if (!matchingPassword) {
      return res.status(400).send("Incorrect Password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, { httpOnly: true });

    user.password = undefined;
    console.log("login details sent: ", user);
    return res.send({ user, profile_pic: user.profile_pic });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).send(err);
  }
};
