import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";
const BookCard = (props) => {
  const navigate = useNavigate();
  const handleJoinDiscussion = () => {
    navigate(`/dboard/${props.id}/${encodeURIComponent(props.bookTitle)}`);
  };
  return (
    <div className="card-container">
      <img src={props.image} alt="book pic missing" className="card-img" />
      {/* <div className="book-card"> */}
      <h4 className="card-title">{props.title}</h4>
      <i className="card-author">Author: {props.author}</i>
      <h5 className="card-published">Published: {props.published}</h5>
      <button className="card-btn" onClick={handleJoinDiscussion}>
        Join the Discussion Forum
      </button>
      {/* </div> */}
    </div>
  );
};

export default BookCard;
