import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  bookmark,
  unBookmark,
  fetchBookmarks,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);
router.post("/bookmark", protect, bookmark);
router.delete("/unbookmark/:userId/:bookId/", unBookmark);
router.get("/getBookmarks", fetchBookmarks);
export default router;
