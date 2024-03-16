import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

import User from "../model/usermodel.js";
import Otpmodel from "../model/otpmodel.js";
import Token from "../model/tokenmodel.js";

dotenv.config();

//SignUp User
export const signupUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ msg: "Email Already Exists" });
    } else {
      const hashedPassword = await bcryptjs.hash(req.body.password, 10);
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      };
      const newUser = new User(user);
      await newUser.save();
      await Otpmodel.deleteMany({ email: req.body.email });
      return res.status(200).json({ msg: "SignUp Successful" });
    }
  } catch (error) {
    console.log("Error while Signing Up:", error);
    return res.status(500).json({ msg: "Error in SignUp" });
  }
};

//Login User
export const loginUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "Username does not match" });
  }

  try {
    let match = await bcryptjs.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "5d" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      const { password, ...rest } = user._doc;
      return res.status(200).json({
        status: true,
        msg: "Successfully login",
        accessToken,
        refreshToken,
        data: { ...rest },
      });
    } else {
      return res.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error while login in user" });
  }
};

//Update User
export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    let user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).json({ msg: "Username does not match" });
    }
    await User.findOneAndUpdate({ email: req.user.email }, { $set: data });
    return res.status(200).json({ msg: "Details updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while updating details of user" });
  }
};
