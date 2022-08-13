import React from "react"
import deliverImg from "../../assets/food-delivery.jpeg";
import classes from "./Invoice.module.css";
const Invoice=(props)=>{
return (<div>
    <img className={classes.deliveryImg} src={deliverImg}/>
    <p>Succefully sent the order!</p>
    <p>order details</p>

</div>);
}

export default Invoice;