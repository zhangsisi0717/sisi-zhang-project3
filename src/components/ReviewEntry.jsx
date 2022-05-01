import "./ReviewEntry.css";
import React from "react";

export default function ReviewEntry(props) {
  return (
    <div className="review-entry">
      <div>Create by: {props.review.username}</div>
      <div>Rating: {props.review.rating}</div>
      <div>Content: {props.review.content}</div>
    </div>
  );
}
