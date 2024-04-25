import { InferSchemaType, model, Schema } from "mongoose";

const blogSchema = new Schema({
   title : String,
   author: String
}, {timestamps: true});

type animal = InferSchemaType<typeof blogSchema>; // new type of type, not rlly needed

export default model<animal>("Blog", blogSchema); // first argument is a model NAME, second is our schema 