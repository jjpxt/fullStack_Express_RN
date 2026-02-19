import { MONGO_URI } from "@/utils/variables";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("db is connected"))
    .catch((error) => console.log("db connection fail:", error));