import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/routesNote";
import routeBlog from "./routes/routerBlog";

const app = express();

app.use(express.json())

app.use("/api/notes",notesRouter)
app.use("/",routeBlog)

app.use((req,res,next)=>{
  next(Error("No endpoint"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(( error : unknown, req: Request, res : Response, next: NextFunction)=> {
  let errorMsg = "random error";
  if (error instanceof Error) {
    errorMsg = error.message; //necessary ?
    console.error(errorMsg);
  }
  res.status(404).json({ error: errorMsg });
});

export default app;

// actuall requests