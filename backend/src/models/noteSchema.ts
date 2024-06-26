import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, require: true},
    title: { type: String, required: true},
    text: { type: String}
}, {timestamps: true});

type Note = InferSchemaType<typeof noteSchema>; // new type of type

export default model<Note>("Note", noteSchema);