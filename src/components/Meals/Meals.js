import { Fragment } from "react";
import AllMeals from "./AllMeals";
import AvailableMeals from "./AvailableMeals";
const Meals = (props) => {
  return (
    <Fragment>
      <AllMeals />
      <AvailableMeals onShowReview={props.onShowReview} reviews={props.reviews}filterType={props.filterType} />
    </Fragment>
  );
};

export default Meals;
