import classes from "./HistoryOrders.module.css";
import Modal from "../UI/Modal";
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";

const HistoryOrders = (props) => {
  const requestConfig = {url: "https://biteaway-c1fec-default-rtdb.firebaseio.com/orders.json",
method: "GET",
}
  return (
    <Modal onClose={props.onClose}>
      <Fragment>
        <p>your last order</p>
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

export default HistoryOrders;
