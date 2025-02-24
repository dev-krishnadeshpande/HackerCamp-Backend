import mongoose from "mongoose";

import { DB_CONNECTION, NODE_ENV, MONGO_URI } from "./serverConfig";

async function ConnectToDB() {
  if (NODE_ENV === "development") {
    await mongoose.connect(DB_CONNECTION!);
  } else {
    await mongoose.connect(MONGO_URI);
  }
}

export default ConnectToDB;
