import { MONGO_URI } from "@/utils/variables";
import mongoose from "mongoose";

if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined!");
}

mongoose.set("strictQuery", true);

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("db is connected"))
    .catch((error) => console.log("db connection fail:", error));