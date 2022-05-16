import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import HistoryOrders from "./components/HistoryOrders/HistoryOrders";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [historyIsShown, setHistoryIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showHistoryHandler = () => {
    setHistoryIsShown(true);
  };

  const hideHistoryHandler = () => {
    setHistoryIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {historyIsShown && <HistoryOrders onClose={hideHistoryHandler}/> }
      <Header onShowCart={showCartHandler} onShowHistory={showHistoryHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
