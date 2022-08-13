import { useContext } from "react";
import MealForm from "./MealForm";
import classes from "./Meal.module.css";
import CartContext from "../../../store/CartContext";
import { Icon } from "@iconify/react";

const Meal = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const onClickFunc = () => {
    props.onShowReview(props.id);
  };
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  // const reviewsOfMeal = [];
  const reviewsOfMeal = props.reviews.filter((review) => review.meal === props.id);
  console.log(props.reviews);
  
  return (
    <li className={classes.meal}>
      <div>
        <h3>
          {props.name} | {props.rate}{" "}
          <Icon
            className={classes.price}
            icon="ic:sharp-star-rate"
            color="orange"
          />
        </h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <p className={classes.reviewP}>{reviewsOfMeal.length} reviews</p>
        <div className={classes.reviewBtn} onClick={onClickFunc}>
          <Icon
            className={classes.icon}
            icon="material-symbols:rate-review-outline"
          />
        </div>
      </div>
      <div>
        <MealForm
          id={props.id}
          onAddToCart={addToCartHandler}
          onShowReview={props.onShowReview}
        />
      </div>
    </li>
  );
};

export default Meal;
