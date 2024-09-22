import { Request, Response } from "express";
import Text from "../models/crudSchema";

// Count total words in a text
export const countTotalWords = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // Find the data by id from the database
    const data = await Text.findById(id);
    if (!data || !data.content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const content = data.content.trim();
    // Check if text is empty
    if (content === "") {
      return res.status(200).json({ message: "Text is empty", data: 0 });
    }

    // Split the text by one or more spaces
    const wordsArray = content.split(/\s+/);
    const totalWords = wordsArray.length;
    res.status(200).json({
      message: "Words successfully counted",
      data: totalWords,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while counting the words",
      error: error.message,
    });
  }
};

// Count total characters in a text
export const countCharacters = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Find data by id from the database
    const data = await Text.findById(id);
    if (!data || !data.content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const content = data.content.replace(/\s+/g, ""); // Remove all spaces
    const totalCharacters = content.length;
    res.status(200).json({
      message: "Characters successfully counted",
      data: totalCharacters,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while counting the characters",
      error: error.message,
    });
  }
};

// Count the number of sentences
export const countSentence = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // Find data from the database
    const data = await Text.findById(id);
    if (!data || !data.content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const sentences = data.content.split(/[.!?]+/).filter(Boolean); // Split by sentence-ending punctuation
    const totalSentences = sentences.length;
    res.status(200).json({
      message: "Sentences successfully counted",
      data: totalSentences,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while counting the sentences",
      error: error.message,
    });
  }
};

// Count the number of paragraphs
export const countParagraphs = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // Find data by id from the database
    const data = await Text.findById(id);
    if (!data || !data.content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const paragraphs = data.content.split(/\n+/).filter(Boolean); // Split by newlines
    const totalParagraphs = paragraphs.length;
    res.status(200).json({
      message: "Paragraphs successfully counted",
      data: totalParagraphs,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while counting the paragraphs",
      error: error.message,
    });
  }
};

// Find the longest word in a text
export const longestWord = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // Find data by id from the database
    const data = await Text.findById(id);
    if (!data || !data.content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const words = data.content
      .replace(/[^\w\s]/g, "") // Remove punctuation
      .split(/\s+/) // Split by whitespace
      .filter(Boolean);

    const longestWord = words.reduce(
      (longest, currentWord) =>
        currentWord.length > longest.length ? currentWord : longest,
      ""
    );

    res.status(200).json({
      message: "Longest word successfully found",
      data: longestWord,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An error occurred while finding the longest word",
      error: error.message,
    });
  }
};
