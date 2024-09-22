
jest.mock("../config/redisClient", () => ({
  get: jest.fn(),
  setEx: jest.fn(),
  del: jest.fn(),
}));

jest.mock("../services/textService", () => ({
  saveText: jest.fn(),
  getAllText: jest.fn(),
  getTextById: jest.fn(),
  deleteTextById: jest.fn(),
  updateTextById: jest.fn(),
}));
import request from "supertest";
import express from "express";
import {
  writeText,
  updateText,
  readText,
  readTextById,
  deleteText,
} from "./textController";
import { saveText, updateTextById } from "../services/textService";
import { redisClient } from "../config/redisClient";
import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import mongoose, { ObjectId } from "mongoose";





const app = express();
app.use(express.json());
app.post("/text", writeText);
app.get("/text", readText);
app.get("/text/:id", readTextById);
app.delete("/text/:id", deleteText);
app.put("/text/:id", updateText);

describe("Text Controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("writeText", () => {
    it("should create text successfully", async () => {
      const mockedUser = new User({
        _id: new mongoose.mongo.ObjectId("4eb6e7e7e9b7f4194e000001"),
        googleId: "iurihfh849489",
        email: "something@gmail.com",
        displayName: "any",
      });
      const req = {
        body: { content: "Some text" },
        user: mockedUser,
      } as unknown as Request;

      const mockSavedText = {
        content: "Some text",
        userId: mockedUser._id,
        _id: "934u923u23099034",
      };

      (saveText as jest.Mock).mockResolvedValue(mockSavedText);

      const res = await request(app)
        .post("/text")
        .send(req.body)
        .set("Authorization", `Bearer token`);

      expect(saveText).toHaveBeenCalled();
      //expect(redisClient.del).toHaveBeenCalledWith("texts");
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: "Text successfully created",
        data: mockSavedText,
      });
    });
  });
});
