import { useState } from "react";
import classes from "./FilterBtn.module.css";
import { Icon } from "@iconify/react";
const FilterBtn = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;


  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <Icon icon="el:filter" />
      </span>
      <span>{props.filterType}</span>
    </button>
  );
};

export default FilterBtn;
