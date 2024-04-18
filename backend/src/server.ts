import app from "./app";
import mongoose from "mongoose";
import env from "./utils/validEnv"

const port = env.PORT; //dotenv (process)


mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
  app.listen(port, () => {
    console.log("SERVER STARTED");
  });
}).catch(console.error);

//conneted to database and listen on PORT any requests 