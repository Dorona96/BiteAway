import React, { useState } from "react";
import classes from "./Filter.module.css";
import Modal from "../UI/Modal";
import { Fragment } from "react/cjs/react.production.min";

const Filter = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const btnClasses = `${classes.buttonFilter} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  return (
    <Modal onClose={props.onClose}>
      <h1>Filter options</h1>
      <Fragment >
          <button
            name="All Meals"
            className={btnClasses}
            onClick={props.filterTypeHandler}
          >
            All Meals
          </button>
          <button
            name="Vegetarian"
            className={btnClasses}
            onClick={props.filterTypeHandler}
          >
            Vegetarian
          </button>
          <button
            name="Appetizer"
            className={btnClasses}
            onClick={props.filterTypeHandler}
          >
            Appetizer
          </button>
          <button
            name="Main Course"
            className={btnClasses}
            onClick={props.filterTypeHandler}
          >
            Main Course
          </button>
          <button
            name="Dessert"
            className={btnClasses}
            onClick={props.filterTypeHandler}
          >
            Dessert
          </button>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              {" "}
              Close
            </button>
          </div>
      </Fragment>
    </Modal>
  );
};

export default Filter;
