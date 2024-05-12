import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import notesRouter from "./routes/routesNote";
import userRouter from "./routes/routerUser";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./utils/validEnv"
import MongoStore from "connect-mongo";


const app = express();

app.use(cors())

app.use(express.json())

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  rolling: true,
  store : MongoStore.create({
    mongoUrl : env.MONGO_CONNECTION_STRING
  })
}));

app.use("/api/users",userRouter)
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

