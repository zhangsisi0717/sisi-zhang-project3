import "./ReviewEntry.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function ReviewEntry(props) {
  const [isEdit, setIsEdit] = useState(false);

  const [newReviewContent, setNewReviewContent] = useState(null);

  const [newReviewRating, setNewReviewRating] = useState(null);

  const [review, setReview] = useState(props.review);

  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  function submitReviewEdit() {
    if (
      !newReviewContent ||
      !newReviewRating ||
      (newReviewContent === review.content && newReviewRating === review.rating)
    ) {
      console.log("no change, not submitted.");
      return;
    }
    Axios.post("/review/edit", {
      id: review._id,
      rating: newReviewRating,
      content: newReviewContent,
    })
      .then((response) => {
        setReview(response.data);
        props.updateRatingFunction(newReviewRating);
        setIsEdit(false);
        setNewReviewContent(null);
        setNewReviewRating(null);
      })
      .catch((err) => console.log(err.message));
  }

  function deleteSelf() {
    Axios.post("/review/delete", {
      id: review._id,
    })
      .then(() => {
        props.deleteReviewFunction();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="review-entry">
      {isEdit || props.username !== review.username ? null : (
        <div>
          <button
            onClick={() => {
              setIsEdit(true);
              setNewReviewContent(review.content);
              setNewReviewRating(review.rating);
            }}
          >
            Edit
          </button>
          <button onClick={deleteSelf}>Delete</button>
        </div>
      )}
      <div>Create by: {review.username}</div>
      <div>
        Last updated:{" "}
        {new Date(review.releaseDate).toLocaleDateString("en-US", dateOptions)}
      </div>
      {isEdit ? (
        <div>
          Rating (1 to 5):
          <select
            value={newReviewRating}
            onChange={(e) =>
              setNewReviewRating(Number.parseFloat(e.target.value))
            }
          >
            <option value={5}>5</option>
            <option value={4.5}>4.5</option>
            <option value={4}>4</option>
            <option value={3.5}>3.5</option>
            <option value={3}>3</option>
            <option value={2.5}>2.5</option>
            <option value={2}>2</option>
            <option value={1.5}>1.5</option>
            <option value={1}>1</option>
            <option value={0.5}>0.5</option>
          </select>
        </div>
      ) : (
        <div>Rating: {review.rating} / 5</div>
      )}
      {isEdit ? (
        <div>
          Content:
          <input
            type="text"
            defaultValue={review.content}
            onChange={(e) => setNewReviewContent(e.target.value)}
          />
          <button onClick={submitReviewEdit}>save</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setNewReviewContent(null);
              setNewReviewRating(null);
            }}
          >
            cancel
          </button>
        </div>
      ) : (
        <div>
          <div>Content: {review.content}</div>
        </div>
      )}
    </div>
  );
}
