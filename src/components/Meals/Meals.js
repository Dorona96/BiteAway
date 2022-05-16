import { Fragment } from "react";
import AllMeals from "./AllMeals";
import AvailableMeals from "./AvailableMeals";
const Meals = () => {
  return (
    <Fragment>
      <AllMeals />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
