import classes from "./HistoryOrdersBtn.module.css";
import { Icon } from "@iconify/react";

const HistoryOrdersBtn = (props) => {
 
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <Icon icon="bi:clock-history" />
      </span>
      <span>Last Orders</span>
    </button>
  );
};

export default HistoryOrdersBtn;
