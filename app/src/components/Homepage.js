import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App";
import SearchBar from "./SearchBar";
import axios from "axios";
import BookList from "./BookList";
import "./Homepage.css";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import Bookmark from "./Bookmark";

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const [searchField, setSearchField] = useState("");

  const storedData = localStorage.getItem("user");
  let name = "";
  let userId = "";
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    name = parsedData.name;
    userId = parsedData._id;
    // Capitalize the first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  const navigate = useNavigate();
  const handleSignOut = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    // Redirect to the sign-in page
    navigate("/signin");
  };
  const searchBook = async (e) => {
    e.preventDefault();
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchField}&key=${process.env.REACT_APP_GOOGLEBOOKS_APIKEY}&maxResults=40`
      )
      .then((res) => setBooks([...res.data.items]))
      .catch((error) => console.log(error));
    console.log(books);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchField(e.target.value);
  };

  return (
    <>
      <Header onSignOut={handleSignOut} />
      <div className="books-display">
        <section className="intro">
          <img
            src={require("../assets/readers-delight-high-resolution-logo.png")}
            alt="brand-logo"
          />
          <p>
            📚 Welcome to Reader's Delight!{" "}
            <span style={{ color: "red" }}>{name}</span>🌐 Explore the world of
            books at your fingertips! Search for any title and immerse yourself
            in vibrant discussion boards. Share your thoughts, discover new
            perspectives, and connect with fellow book enthusiasts. Your
            literary journey begins here – where every search unlocks a realm of
            endless possibilities. Happy reading and discussing at Reader's
            Delight! 📖✨
          </p>
        </section>

        <SearchBar searchBook={searchBook} handleSearch={handleSearch} />
        <BookList books={books} />
        <div className="homepage-details">
          <Leaderboard />
          <Bookmark userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
