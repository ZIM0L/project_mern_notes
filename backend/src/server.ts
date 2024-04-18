import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validEnv"

const port = process.env.PORT; //dotenv (process)

app.get("/", (req, res) => {
  res.send("HI, what up");
});

mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
  console.log("connected");
  app.listen(port, () => {
    console.log("SERVER STARTED");
  });
}).catch(console.error);

