import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import "./PostItem.css";

const baseUrl = process.env.REACT_APP_BASEURL;
const API_URL = `${baseUrl}/api/posts/`;

const PostItem = ({ post, onPostDeleted }) => {
  const storedData = localStorage.getItem("user");
  const parsedData = JSON.parse(storedData);
  const { token } = parsedData;
  const { bookId } = useParams();

  const deletePost = async (postId, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${API_URL}/${postId}`, config);
      onPostDeleted();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        alert(errorMessage);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-time">
          {new Date(post.createdAt).toLocaleString("en-IN")}
        </div>
        <button onClick={() => deletePost(post._id, token)} className="close">
          X
        </button>
      </div>
      <div className="post-comment">
        <h3>
          <span className="name">
            {post.name.charAt(0).toUpperCase() +
              post.name.slice(1).toLowerCase()}
          </span>{" "}
          : "{post.text}"
        </h3>
      </div>
    </div>
  );
};

export default PostItem;
