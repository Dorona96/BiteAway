import classes from "./Order.module.css";

const Order = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['order-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
    </li>
  );
};

export default Order;
