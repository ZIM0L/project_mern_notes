import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, require: true},
    text: { type: String}
}, {timestamps: true});

type Note = InferSchemaType<typeof noteSchema>; // new type of type

export default model<Note>("Note", noteSchema);