import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import "./Bookmark.css";

const Bookmarks = ({ userId }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const baseUrl = process.env.REACT_APP_BASEURL;
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/users/getBookmarks?userId=${userId}`
        );
        setBookmarks(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [userId]);

  const handleDeleteBookmark = async (userId, discussionBoardId) => {
    try {
      await axios.delete(
        `${baseUrl}/api/users/unbookmark/${userId}/${discussionBoardId}`
      );
      // Filter out the deleted bookmark from the bookmarks state
      setBookmarks(
        bookmarks.filter(
          (bookmark) =>
            bookmark.userId !== userId ||
            bookmark.discussionBoardId !== discussionBoardId
        )
      );
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
  };

  return (
    <div className="bookmarks">
      <h2>Your Bookmarks</h2>
      {bookmarks.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th> X </th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/dboard/${bookmark.discussionBoardId}/${bookmark.bookTitle}`}
                  >
                    {bookmark.bookTitle}
                  </Link>
                </td>
                <td>
                  <button
                    className="btn-block2"
                    onClick={() =>
                      handleDeleteBookmark(
                        bookmark.userId,
                        bookmark.discussionBoardId
                      )
                    }
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>
          You have no bookmarks yet. Search for any book and add it as bookmark
          to follow your favourite books
        </h3>
      )}
    </div>
  );
};

export default Bookmarks;
