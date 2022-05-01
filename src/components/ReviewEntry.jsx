import "./ReviewEntry.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function ReviewEntry(props) {
  const [isEdit, setIsEdit] = useState(false);

  const [newReviewContent, setNewReviewContent] = useState(null);

  const [newReviewRating, setNewReviewRating] = useState(null);

  const [review, setReview] = useState(props.review);

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
        setIsEdit(false);
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
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <button onClick={deleteSelf}>Delete</button>
        </div>
      )}
      <div>Create by: {review.username}</div>
      {isEdit ? (
        <div>
          Rating:
          <input
            type="number"
            defaultValue={review.rating}
            onChange={(e) =>
              setNewReviewRating(Number.parseInt(e.target.value))
            }
          />
        </div>
      ) : (
        <div>Rating: {review.rating}</div>
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
          <button onClick={() => setIsEdit(false)}>cancel</button>
        </div>
      ) : (
        <div>
          <div>Content: {review.content}</div>
        </div>
      )}
    </div>
  );
}
