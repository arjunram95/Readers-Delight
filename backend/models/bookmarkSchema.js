// bookmarkSchema.js
import { Schema, model } from "mongoose";

const bookmarkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    discussionBoardId: {
      type: String,
    },
    bookTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const Bookmark = model("Bookmark", bookmarkSchema);

export default Bookmark;
