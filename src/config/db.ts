import mongoose, { ConnectOptions } from "mongoose";
import logger from "./logger";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL as string,
      {
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
