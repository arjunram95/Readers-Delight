import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import axios from "axios";
import PostItem from "./PostItem";
import "./DiscussionBoard2.css";
import BookDetails from "./BookDetails";
import Header from "./Header";

const baseUrl = process.env.REACT_APP_BASEURL;
const API_URL = `${baseUrl}/api/posts/`;

const DiscussionBoard = () => {
  const storedData = localStorage.getItem("user");
  const parsedData = JSON.parse(storedData);
  let { name, token, _id } = parsedData;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const [posts, setPosts] = useState([]);
  const { bookId, bookTitle } = useParams();
  console.log(bookId, bookTitle);
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/users/getBookmarks?userId=${_id}`
        );
        const userBookmarks = response.data;
        const isBookmarked = userBookmarks.some(
          (bookmark) => bookmark.discussionBoardId === bookId
        );
        setBookmarked(isBookmarked);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    checkBookmarkStatus();
  }, [bookId, _id]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await axios.delete(
          `${baseUrl}/api/users/unbookmark/${_id}/${bookId}`,
          config
        );
        setBookmarked(false);
      } else {
        await axios.post(
          `${baseUrl}/api/users/bookmark`,
          {
            userId: _id,
            discussionBoardId: bookId,
            bookTitle: bookTitle,
          },
          config
        );
        setBookmarked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPosts = async (bookId, token) => {
    try {
      console.log(token);
      const response = await axios.get(`${API_URL}?bookId=${bookId}`, config);
      const posts = response.data;
      setPosts(posts);
      console.log("posts fetched from server: ", posts);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  };

  const handlePostChange = () => {
    getPosts(bookId, token);
  };

  useEffect(() => {
    getPosts(bookId, token);
  }, []);

  return (
    <>
      <Header onSignOut={handleSignOut} />
      <div className="dashboard-container">
        <div className="book-details">
          <h1>Welcome {name}</h1>
          <BookDetails bookId={bookId} />
        </div>

        <div className="posts-column">
          <section className="content">
            {posts?.length > 0 ? (
              <div className="posts">
                {posts.map((post) => (
                  <PostItem
                    key={post._id}
                    post={post}
                    bookId={bookId}
                    onPostDeleted={handlePostChange}
                  />
                ))}
              </div>
            ) : (
              <h3>There are no comments yet</h3>
            )}
          </section>
        </div>

        <div className="add-post">
          <img
            src={require("../assets/readers-delight-high-resolution-logo.png")}
            alt="brand-logo"
          />
          <p>Do you want to add this Discussion Board to your bookmark ? </p>
          <button
            className="btn btn-block bookmark-btn"
            onClick={handleBookmark}
          >
            {bookmarked ? "Unbookmark" : "Bookmark"}
          </button>
          <PostForm onPostCreated={handlePostChange} bookTitle={bookTitle} />
        </div>
      </div>
    </>
  );
};

export default DiscussionBoard;
