import express from "express";
import * as UserController from "../controllers/userControllers";
import { requiresAuth } from "../middleware/auth";

const userRouter = express.Router();
//first authentication, later endpoint handler
userRouter.get("/", requiresAuth , UserController.getAuthenticatedUser);
userRouter.get("/", UserController.getAuthenticatedUser);
userRouter.get("/finduser", UserController.findUser);
userRouter.post("/signup", UserController.singUp);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);

export default userRouter;
