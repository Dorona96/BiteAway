import { Fragment } from "react/cjs/react.production.min";
import classes from "./Review.module.css";
import Modal from "../UI/Modal";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";

const Review = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const commentRef = useRef();
  const nameRef = useRef();
  const [star, setStar] = useState(0);
  console.log(props.meal);
  const submitReview = async (data) => {
    setIsSubmitting(true);

    await fetch(
      "https://biteaway-c1fec-default-rtdb.firebaseio.com/reviews.json",
      {
        method: "POST",
        body: JSON.stringify({
          comment: data.comment,
          id: props.meal,
          name: data.name,
          rate: data.rate,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const reviewHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredComment = commentRef.current.value;
    const enteredRate = star;
    submitReview({
      name: enteredName,
      comment: enteredComment,
      rate: enteredRate,
    });
  };

  const reviewsOfMeal = props.reviews.filter(
    (review) => review.meal === props.meal
  );

  return (
    <Modal onClose={props.onClose}>
      <Fragment>
        {!didSubmit && (
          <div>
            <ul className={classes.reviews}>
              {reviewsOfMeal.map((review) => (
                <div className={classes.reviewsList}>
                  <div>
                    <label>from:</label>
                    <p> {review.name}</p>
                  </div>
                  <div>
                    <label>rated:</label>
                    <p>
                      {review.rate}
                      <Icon
                        id="star"
                        icon="ant-design:star-filled"
                        color="#f9d90c"
                      />{" "}
                    </p>
                  </div>
                  <div>
                    <label>comment:</label>
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </ul>
            <h2>Add a review</h2>
            <form className={classes.form} onSubmit={reviewHandler}>
              <div>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  ref={nameRef}
                  required
                />
                <input
                  type="text"
                  placeholder="Add a review.."
                  ref={commentRef}
                  required
                />
                <div className={classes.stars}>
                  <Icon
                    id="star1"
                    icon={
                      star >= 1 ? "ant-design:star-filled" : "akar-icons:star"
                    }
                    color="#f9d90c"
                    onClick={() => setStar(1)}
                  />{" "}
                  <Icon
                    id="star2"
                    icon={
                      star >= 2 ? "ant-design:star-filled" : "akar-icons:star"
                    }
                    color="#f9d90c"
                    onClick={() => setStar(2)}
                  />
                  <Icon
                    id="star3"
                    icon={
                      star >= 3 ? "ant-design:star-filled" : "akar-icons:star"
                    }
                    color="#f9d90c"
                    onClick={() => setStar(3)}
                  />
                  <Icon
                    id="star4"
                    icon={
                      star >= 4 ? "ant-design:star-filled" : "akar-icons:star"
                    }
                    color="#f9d90c"
                    onClick={() => setStar(4)}
                  />
                  <Icon
                    id="star5"
                    icon={
                      star >= 5 ? "ant-design:star-filled" : "akar-icons:star"
                    }
                    color="#f9d90c"
                    onClick={() => setStar(5)}
                  />
                </div>
              </div>
              <div className={classes.actions}>
                <button className={classes.button}>Post</button>
              </div>
            </form>
          </div>
        )}
        {didSubmit && (
          <div>
            <h2>Thank you for the review!</h2>
          </div>
        )}
      </Fragment>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          {" "}
          Close
        </button>
      </div>
    </Modal>
  );
};
export default Review;
