import express from "express";
import * as UserController from "../controllers/userControllers";

const userRouter = express.Router();
userRouter.get("/", UserController.getAuthenticatedUser);
userRouter.get("/finduser", UserController.findUser);
userRouter.post("/signup", UserController.singUp);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);

export default userRouter;
