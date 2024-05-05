import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRouter from "./routes/routesNote";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(express.json())

app.use("/api/notes",notesRouter)

app.use((req,res,next)=>{
  next(createHttpError(404,"No endpoint!"))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(( error : unknown, req: Request, res : Response, next: NextFunction)=> {
  let errorMsg = "random error";
  let statusCode = 500; //default
  if (isHttpError(error)) { // is this error instance of createHttpError
    statusCode = error.statusCode
    errorMsg = error.message
  }
  res.status(statusCode).json({ error: errorMsg });
});

export default app;

