import { Request, Response } from "express";
import Text from "../models/crudSchema";
import { redisClient } from "../config/redisClient";
import logger from "../config/logger";
import { IUser } from "../models/User";
import {
  deleteTextById,
  getAllText,
  getTextById,
  saveText,
  updateTextById,
} from "../services/textService";

export const writeText = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body;

  try {
    const savedText = await saveText(content, req.user as IUser);
    await redisClient.del("texts");
    res
      .status(201)
      .json({ message: "Text successfully created", data: savedText });
  } catch (error: any) {
    logger.error(`${error.message} happened while trying to write the text`);
    res
      .status(500)
      .send(
        `${(error as Error).message} An error occurred while writing the text`
      );
  }
};

// GET: Retrieve all text documents
export const readText = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if the data is in the cache
    const cachedData = await redisClient.get("texts");

    if (cachedData) {
      res.status(200).json({
        message: "Content successfully retrieved",
        data: JSON.parse(cachedData),
      });
    } else {
      const content = await getAllText();
      await redisClient.setEx("texts", 3600, JSON.stringify(content));
      res.status(200).json({
        message: "Content successfully retrieved",
        data: content,
      });
    }
  } catch (error) {
    logger.error(
      `${(error as Error).message} happened while trying to write the text`
    );
    res
      .status(500)
      .send(
        `${
          (error as Error).message
        } An error occurred while getting all the texts`
      );
  }
};

// GET: Retrieve a single text document by ID
export const readTextById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const contentId = req.params.id;

  try {
    const singleContent = await getTextById(contentId);
    res.status(200).json({
      message: "Content successfully retrieved",
      data: singleContent,
    });
  } catch (error) {
    logger.error(
      `${(error as Error).message} happened while trying to write the text`
    );
    res
      .status(500)
      .send(
        `${
          (error as Error).message
        } An error occurred while getting the text by id of ${contentId}`
      );
  }
};

// DELETE: Delete a text document by ID
export const deleteText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const findContent = await getTextById(id);
    if (!findContent) {
      throw new Error("Content not found");
    }

    await deleteTextById(id);
    await redisClient.del("texts");
    res.status(200).json({ message: "Content successfully deleted" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the content",
    });
  }
};

// PUT: Update a text document by ID
export const updateText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const newContent = req.body;

  try {
    const updatedText = await updateTextById(id, newContent.content);
    await redisClient.del("texts");
    const allTexts = await Text.find({});
    await redisClient.setEx("texts", 3600, JSON.stringify(allTexts));
    res.status(200).json(updatedText);
  } catch (error) {
    logger.error(
      `${(error as Error).message} faced while trying to update the text`
    );
    res.status(500).send("Error occurred while updating text");
  }
};
