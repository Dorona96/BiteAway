import {Fragment} from 'react';
import classes from "./Header.module.css";
import mealsImage from "../../assets/mealsImage.jpg";
import CartBtn from './CartBtn';
import HistoryOrdersBtn from './HistoryOrdersBtn';
import Logo from "./logo.png"

const Header = props =>{
    return <Fragment>
        <header className={classes.header}>
            <h1>BiteAway
                <img className={classes.logo} src={Logo}/>
            </h1>
            <CartBtn onClick={props.onShowCart}/>
            <HistoryOrdersBtn onClick={props.onShowHistory}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="food on table"/>
        </div>
    </Fragment>
};

export default Header;