import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookDetails.css";
const BookDetails = ({ bookId }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        // Remove the colon from the bookId
        const formattedBookId = bookId.replace(":", "");
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${formattedBookId}`
        );
        setBookDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!bookDetails) {
    return null;
  }

  const { volumeInfo } = bookDetails;

  return (
    <div>
      <h2>{volumeInfo.title}</h2>
      {volumeInfo.imageLinks && (
        <img src={volumeInfo.imageLinks.thumbnail} alt="Book cover" />
      )}
      <p>Author(s): {volumeInfo.authors?.join(", ")}</p>
      <p>Publisher: {volumeInfo.publisher}</p>
      <p>Published Date: {volumeInfo.publishedDate}</p>
      <p>Description: {volumeInfo?.description}</p>
      <p>
        ISBN-10:{" "}
        {
          volumeInfo.industryIdentifiers.find(
            (identifier) => identifier.type === "ISBN_10"
          )?.identifier
        }
      </p>
      <p>
        ISBN-13:{" "}
        {
          volumeInfo.industryIdentifiers.find(
            (identifier) => identifier.type === "ISBN_13"
          )?.identifier
        }
      </p>
      <p>Categories: {volumeInfo?.categories}</p>
      <p>Maturity Rating: {volumeInfo?.maturityRating}</p>
      <a href={volumeInfo?.previewLink}>
        Preview Link: {volumeInfo?.previewLink}
      </a>
      <p>
        Price:{" "}
        {volumeInfo?.retailPrice?.amount
          ? volumeInfo.retailPrice.amount
          : "N/A"}{" "}
        {volumeInfo?.retailPrice?.currencyCode
          ? volumeInfo.retailPrice.currencyCode
          : ""}
      </p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookDetails;
