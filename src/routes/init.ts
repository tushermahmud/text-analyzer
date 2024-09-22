import curdRoutes from "./crud";
import analysisRoutes from "./textAnalysis";
import { Express } from "express";
import userRouter from "./user";
const routesRegistration = (app: Express) => {
  app.use("/crud", curdRoutes);
  app.use("/analysis", analysisRoutes);
  app.use("/user", userRouter);
};

export default routesRegistration;
