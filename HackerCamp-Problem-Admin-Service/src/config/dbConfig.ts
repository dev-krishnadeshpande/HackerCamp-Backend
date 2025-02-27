import mongoose from "mongoose";

import { DB_CONNECTION } from "./serverConfig";

async function ConnectToDB() {
  await mongoose.connect(DB_CONNECTION!);
}

export default ConnectToDB;
