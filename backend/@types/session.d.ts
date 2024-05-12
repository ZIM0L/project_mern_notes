import mongoose from "mongoose";

//adding additional types to this package
declare module "express-session" {
    interface SessionData {
        userId: mongoose.Types.ObjectId
    }
}