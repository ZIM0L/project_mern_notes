import express from "express";
import * as blogControllers from "../controllers/blogControllers";

const routeBlog = express.Router(); //endpoint of our server that is already created
routeBlog.get("/api/blog/create", blogControllers.createtBlog)
routeBlog.get("/api/blogs", blogControllers.getBlog)

export default routeBlog