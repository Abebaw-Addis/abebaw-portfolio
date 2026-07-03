import User from "./auth-model.js";

import {
  hashPassword,
  comparePassword,
  generateToken
} from "./auth-service.js";

export const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({
        $or: [{ email }, { username }]
      });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = password === user.password; // For demonstration purposes only. In production, use hashed passwords and compare using bcrypt.
    // await comparePassword(
    //   password,
    //   user.password
    // );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token =
      generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};