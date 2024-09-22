import logger from "../config/logger";
import User, { IUser } from "../models/User";

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById({ _id: id });
    return user;
  } catch (error) {
    logger.error("Error fetching user by ID:", error);
    return null;
  }
};

