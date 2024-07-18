import express from "express";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
  getProfile,
} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import { authenticate } from "../middlewares/authenticait.js";
import { storage } from "../middlewares/upload.js";

 const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(registerSchema), register);

usersRouter.post("/login", validateBody(loginSchema), login);

usersRouter.get("/current", authenticate, getCurrent);

usersRouter.get("/profile", authenticate, getProfile);

usersRouter.patch("/logout", authenticate, logout);

usersRouter.patch(
  "/avatar",
  authenticate,
  storage.single("avatar"),
  updateAvatar
);

export default usersRouter;