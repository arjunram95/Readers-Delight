import React from "react";
import "./SearchBar.css";
import { FaSearchengin, FaAnglesDown } from "react-icons/fa6";
const SearchBar = (props) => {
  return (
    <div className="search-bar-container">
      <form
        id="search-form"
        className="search-bar"
        onSubmit={props.searchBook}
        action=""
      >
        <input
          id="search-input"
          onChange={props.handleSearch}
          type="text"
          placeholder="   Enter a keyword to search for a book  "
        />
        <button type="submit">
          {/* <i class="fa-solid fa-magnifying-glass"></i> */}
          <FaSearchengin />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
