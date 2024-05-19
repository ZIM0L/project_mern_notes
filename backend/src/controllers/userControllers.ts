import { RequestHandler } from "express";
import { IUser, LoginBody, findUserBody } from "../utils/userInterface";
import createHttpError from "http-errors";
import UserModel from "../models/userSchema";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getAuthenticatedUser: RequestHandler = async (req,res,next) => {
  try {
    const user = await UserModel.findById(req.session.userId).select("+email").exec();
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
}

export const singUp: RequestHandler<unknown, unknown, IUser, unknown> = async (
  req,
  res,
  next
) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "There is missing params");
    }
    const alreadyExistingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (alreadyExistingUsername) {
      throw createHttpError(
        409,
        "Username already has been taken. Please choose a different one"
      );
    }
    const alreadyExistingEmail = await UserModel.findOne({
      email: email,
    }).exec();
    if (alreadyExistingEmail) {
      throw createHttpError(409, "Username with this email already exits.");
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
export const logout: RequestHandler = async (req,res,next) => {
  req.session.destroy((error)=> {
    if (error) {
      next(error)
    } else {
      res.sendStatus(200)
    }
  })
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }
    //we want those information back in response
    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    //compere req password with database hashedPassword
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }
    //session established !!
    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error);
  }
};

export const findUser: RequestHandler<
  unknown,
  unknown,
  findUserBody,
  unknown
> = async (req, res, next) => {
  const user_id = req.body.id
  try {
    if (!mongoose.isValidObjectId(user_id)) {
      throw createHttpError(400, "Parameters missing");
    }
    const user = await UserModel.findById(user_id).exec()
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
 
    res.status(201).json(user)
  } catch (error) {
    next(error);
  }
};
