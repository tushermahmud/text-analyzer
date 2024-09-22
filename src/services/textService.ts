import logger from "../config/logger";
import Text, { IText } from "../models/crudSchema";
import { ObjectId } from "mongodb"; // Add this import
import { IUser } from "../models/User";


export const getAllTextsByUser = async (userId: ObjectId): Promise<IText[]> => {
  try {
    const texts = await Text.find({ userId: userId });
    logger.info(`Fetched ${texts.length} texts for userId: ${userId}`); // Log info
    return texts;
  } catch (error) {
    logger.error(
      `Error fetching texts for userId: ${userId} - ${(error as Error).message}`
    );
    throw error;
  }
};

export const saveText = async (content: string, user: IUser) => {
  try {
    if (!content) {
      throw new Error("Content field is required");
    }
    const newText = new Text({
      content: content,
      userId: user._id,
    });

    const savedText = await Text.create(newText);
    return savedText;
  } catch (error) {
    throw error;
  }
};

export const getAllText = async (): Promise<IText[]> => {
  try {
    const texts = await Text.find({});
    return texts;
  } catch (error) {
    logger.error(`Error fetching texts: ${(error as Error).message}`);
    throw error;
  }
};

export const updateTextById = async (
  id: string,
  content: string
): Promise<IText | null> => {
  try {
    if (!content) {
      throw new Error("The content must have value");
    }
    const updatedText = await Text.findByIdAndUpdate(
      id,
      { content: content },
      { new: true }
    );
    return updatedText;
  } catch (error) {
    logger.error(`Error updating texts: ${(error as Error).message}`);
    throw error;
  }
};

export const getTextById = async (id: string): Promise<IText | null> => {
  try {
    if (!id) {
      throw new Error("Content ID is required");
    }
    const text = await Text.findById({ _id: id });
    return text;
  } catch (error) {
    logger.error(`Error fetching text by ${id}: ${(error as Error).message}`);
    throw error;
  }
};

export const deleteTextById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Content ID is required");
    }
    const text = await Text.deleteOne({ _id: id });
    return text;
  } catch (error) {
    logger.error(`Error deleting text ${id}: ${(error as Error).message}`);

    throw error;
  }
};
