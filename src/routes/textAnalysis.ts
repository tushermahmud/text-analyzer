import express from "express";
import {
  countCharacters,
  countSentence,
  countTotalWords,
  longestWord,
} from "../controllers/textAnalysisController";
const router = express.Router();

router.get("/totalWord/:id", countTotalWords);
router.get("/totalCharacters/:id", countCharacters);
router.get("/totalSentence/:id", countSentence);
router.get("/longestWord/:id", longestWord);

export default router;
