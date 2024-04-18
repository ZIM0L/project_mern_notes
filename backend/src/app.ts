import "dotenv/config";
import mongoose from "mongoose";
import express from "express";

const app = express();
app.get("/", (req, res) => {
    res.send("HI, what up");
  });

export default app;