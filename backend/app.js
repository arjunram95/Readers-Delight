import express from "express";
import cors from "cors";
import connectToDb from "./db";
import { join } from "path";
import home from "./routes/home";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import { errorHandler } from "./middleware/errorMiddleware";
// require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "../app/build")));
app.use(express.static(join(__dirname, "build")));
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/", home);
app.use(errorHandler);

//serve frontend
if (process.env.NODE_ENV) {
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "build", "index.html"));
  });
} else {
  app.get("/*", (req, res) => res.send("Please set to production"));
}
Promise.all([connectToDb()]).then(() =>
  app.listen(5000, () => console.log(`Server started on port 5000`))
);
