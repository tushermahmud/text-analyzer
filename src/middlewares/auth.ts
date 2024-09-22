import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  logger.error("Authentication error. You are not authorized to see this page");
  res.redirect("/");
};

export default isAuthenticated;
