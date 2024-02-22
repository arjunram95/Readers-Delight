import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/user";
import Bookmark from "../models/bookmarkSchema";

//  register new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log(req.body);
    res.status(400);
    throw new Error("please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  res.json({ message: "Login User" });
});

// get user data
export const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//Generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

// Bookmark a discussion board
export const bookmark = asyncHandler(async (req, res) => {
  const { userId, discussionBoardId, bookTitle } = req.body;

  try {
    const bookmark = new Bookmark({ userId, discussionBoardId, bookTitle });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Unbookmark a discussion board
export const unBookmark = asyncHandler(async (req, res) => {
  const { userId, bookId } = req.params;
  console.log(req.params);

  try {
    const bookmark = await Bookmark.findOne({
      userId: userId,
      discussionBoardId: bookId,
    });
    if (bookmark) {
      // If the bookmark document exists, you can delete it using its _id
      const deletedBookmark = await Bookmark.findByIdAndDelete(bookmark._id);
      if (deletedBookmark) {
        // Bookmark successfully deleted
        res.json({ success: true });
      } else {
        // Bookmark was not found or failed to delete
        res.status(404).json({ error: "Bookmark not found" });
      }
    } else {
      // Bookmark with the specified discussionBoardId not found
      res.status(404).json({ error: "Bookmark not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch bookmarks
export const fetchBookmarks = asyncHandler(async (req, res) => {
  const { userId } = req.query; // Assuming userId is available in req.body
  const bookmarks = await Bookmark.find({ userId: userId });
  console.log(bookmarks);
  res.json(bookmarks);
});
