import { useEffect, useState, Fragment } from "react";
import classes from "./HistoryOrders.module.css";
import Modal from "../UI/Modal";
import Order from "./Order";

const HistoryOrders = (props) => {
  const [lastOrders, setLastOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchLastOrders = async () => {
      const response = await fetch(
        "https://biteaway-c1fec-default-rtdb.firebaseio.com/orders.json"
      );

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const data = await response.json();
      const loadedLastOrders = [];
      for (const key in data) {
        loadedLastOrders.push({
          id: key,
          user:data[key].user,
          orderItems: data[key].orderItems,
        });
      }
      setLastOrders(loadedLastOrders);
      setIsLoading(false);
    };
    fetchLastOrders().catch((errorMes) => {
      setIsLoading(false);
      setError(errorMes.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p>{error}</p>
      </section>
    );
  }
const filteredHistoryItems=lastOrders.filter(item=>item.user.email===props.user);
  const historyItems = (
    <ul className={classes["order-items"]}>
      {!filteredHistoryItems[0]?<p>no order has been made!</p>:null}
      {filteredHistoryItems.map((order) => (
        <div>
          {order.orderItems.map((item) => (
            <Order
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
            />
          ))}
        </div>
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      <Fragment>
        <div className={classes.total}>
          <span>Your Last Orders</span>
        </div>
        {historyItems}
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
