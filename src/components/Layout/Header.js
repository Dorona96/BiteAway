import { Fragment } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/mealsImage.jpg";
import CartBtn from "./CartBtn";
import HistoryOrdersBtn from "./HistoryOrdersBtn";
import Logo from "./logo.png";
import FilterBtn from "./FilterBtn";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          BiteAway
          <img className={classes.logo} src={Logo} />
        </h1>
        <CartBtn onClick={props.onShowCart} />
        <HistoryOrdersBtn onClick={props.onShowHistory} />
        <FilterBtn onClick={props.onShowFilter} filterType={props.filterType}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="food on table" />
      </div>
    </Fragment>
  );
};

export default Header;
