import { Router } from "express";
import {
  getPosts,
  setPost,
  updatePost,
  deletePost,
  getLeaderBoard,
} from "../controllers/postController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.route("/").get(protect, getPosts).post(protect, setPost);

router.route("/:id").delete(protect, deletePost).put(protect, updatePost);

router.route("/leaderboard").get(protect, getLeaderBoard);

export default router;
