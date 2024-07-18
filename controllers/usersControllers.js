import { User } from "../db/models/User.js";
import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";
import path from "path";
import fs from "fs/promises";

  
const { SECRET_KEY } = process.env;


export const register = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "User already exist");
    }
    const defaultAvatarURL = '/defaults/elephant.jpg';
    // const defaultAvatarURL = 'https://res.cloudinary.com/dock6nsbn/image/upload/v1721236046/elephant_fibzar.jpg';
    const newUser = new User({ ...req.body, avatar: defaultAvatarURL }); 
    
    await newUser.hashPassword();
    await newUser.save();
    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(newUser._id, { token });
    res.status(201).json({
      token,
      user: {
        name,
        email,
        avatarURL: newUser.avatar, // Отправьте путь к аватару пользователя
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "email or password is wrong");
    }
    const passwordCorrect = await user.comparePassword(password);
    console.log("passwordCorrect", passwordCorrect);
    if (!passwordCorrect) {
      throw HttpError(401, "email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: {
        name: user.name,
        email,
        avatarURL: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = (req, res) => {
  const { email, name, avatar: avatarURL } = req.user;
  res.status(200).json({ email, name, avatarURL });
};
// Личный кабинет пользователя
export const getProfile = async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.status(200).json(user);
  };


export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.sendStatus(204);
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { file } = req;
    if (!file) {
      throw HttpError(400, "You need file");
    }
    const { path: tempUpload, originalname } = file;
    const newName = `${_id}${originalname}`;
    const resultUpload = path.resolve("public", "avatars", newName);
    await fs.rename(tempUpload, resultUpload);
    const avatar = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatar }, { new: true });
    res.status(200).json({ avatar });
  } catch (error) {
    next(error);
  }
};

// export const updateAvatar = async (req, res, next) => {
//   try {
//     const { _id } = req.user;
//     const { file } = req;
//     if (!file) {
//       throw HttpError(400, "You need file");
//     }
//     const { path: tempUpload, originalname } = file;
//     const newName = `${_id}${originalname}`;
//     const resultUpload = path.resolve("public", "avatars", newName);
//     await fs.rename(tempUpload, resultUpload);
//     let avatar = path.join("avatars", newName);
//     avatar = avatar.replace(/\\/g, "/"); // Заменяем все обратные слеши на прямые
//     await User.findByIdAndUpdate(_id, { avatar }, { new: true });
//     res.status(200).json({ avatar });
//   } catch (error) {
//     next(error);
//   }
// };