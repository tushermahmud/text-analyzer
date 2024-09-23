
import * as dotenv from 'dotenv';
dotenv.config(); 
import express from "express";
import connectDB from "./config/db";
import logger from "./config/logger";
import cors from "cors";
import routesRegistration from "./routes/init";
import rateLimit from "express-rate-limit";
import session from "express-session";
import passport from "passport";
import path from "path";
import { connectRedis } from "./config/redisClient";
import "./middlewares/googleAuth";
import "./middlewares/sessionManagement";
import { getUserById } from "./services/userService";
import isAuthenticated from "./middlewares/auth";

const app = express();

connectDB();
connectRedis();

//configure the rate limiter(100 request per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request form this Ip, please try again after 2 minutes",
});

app.use(limiter);

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "https://your-allowed-origin.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Google OAuth Strategy
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set views directory

// Serve Bootstrap
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/text");
  }
);

app.get("/text", isAuthenticated, async(req, res) => {
  const user = await getUserById((req.user as any)._id);
  logger.info("logged in user info",user)
  res.render("textEditor", { user: user });
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

//define routes
routesRegistration(app);
export default app;
