import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

const Leaderboard = () => {
  const baseUrl = process.env.REACT_APP_BASEURL;
  const [leaderboard, setLeaderboard] = useState([]);

  const storedData = localStorage.getItem("user");
  let token = "";
  if (storedData) {
    const parsedData = JSON.parse(storedData);

    token = parsedData.token;
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    // Fetch leaderboard data when the component mounts
    axios
      .get(`${baseUrl}/api/posts/leaderboard`, config) // Replace '/api/leaderboard' with the actual endpoint URL
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
      });
  }, []);

  return (
    <div className="leaderboard">
      <h2>Most Active Discussion Boards</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Index + 1 for 1-based rank */}
              <td>
                <Link to={`/dboard/${entry._id}/${entry.bookTitle}`}>
                  {entry.bookTitle}
                </Link>
              </td>
              <td>{entry.commentCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
