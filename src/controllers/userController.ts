import logger from "../config/logger";
import { IUser } from "../models/User";
import { getAllTextsByUser } from "../services/textService";
import { Request, Response } from "express"; // Ensure Response is imported

export const getTextReport = async (req: Request, res: Response) => {
  const userId = (req.user as IUser)._id ?? null;
  try {
    const texts = await getAllTextsByUser(userId);

    if (!texts || texts.length === 0) {
      logger.warn(`No texts found for userId: ${userId.toString()}`);
      return res.status(404).json({ message: "No texts found for this user." });
    }

    const reports = texts.map((text) => ({
      textId: text._id,
      text: text.content,
      wordCount: text.content.split(" ").length,
      charCount: text.content.replace(/\s+/g, "").length,
      sentenceCount: text.content.split(".").length - 1,
      paragraphCount: text.content.split("\n").length,
      longestWord: text.content
        .split(" ")
        .reduce((a, b) => (b.length > a.length ? b : a), ""),
    }));

    logger.info(
      `All texts report found for userId: ${userId.toString()}. Reports here: ${reports}`
    );

    return res.status(200).json(reports);
  } catch (error) {
    logger.error(`${(error as Error).message} occurred while fetching user`);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the user" });
  }
};
