import React from "react";
import BookCard from "./BookCard";
import "./BookList.css";
const BookList = (props) => {
  return (
    <div className="book-list">
      {props.books.map((book, i) => {
        return (
          <BookCard
            key={i}
            image={
              book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : "No Image Available"
            }
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors}
            published={book.volumeInfo.publishedDate}
            id={book.id}
            bookTitle={book.volumeInfo.title}
            books={props.books} // does this work
          />
        );
      })}
    </div>
  );
};

export default BookList;
