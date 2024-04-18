import express from "express";
import * as blogControllers from "../controllers/blogControllers";

const routeBlog = express.Router(); //endpoint of our server that is already created
routeBlog.get("/api/blog", blogControllers.getBlog)

export default routeBlog