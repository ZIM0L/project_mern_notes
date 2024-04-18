import { cleanEnv, port, str } from "envalid";

// These must be present
export default cleanEnv(process.env,{
    MONGO_CONNECTION_STRING: str(),
    PORT: port()}
)