import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {type : String, required: true , unique: true},
    //select makes that by defalut it doesn't return value in response
    email: {type : String, required: true, unique: true, select: false},
    password: {type : String, required: true, select: false}
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User",userSchema)