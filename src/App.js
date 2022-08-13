import { useState, useEffect } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import HistoryOrders from "./components/HistoryOrders/HistoryOrders";
import Filter from "./components/Filter/Filter";
import Review from "./components/Reviews/Review";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false); //change to true before sending
  const [registerIsShown, setRegisterIsShown] = useState(false);
  const [historyIsShown, setHistoryIsShown] = useState(false);
  const [filterIsShown, setFilterIsShown] = useState(false);
  const [reviewIsShown, setReviewIsShown] = useState(false);
  const [filterType, setFilterType] = useState("All Meals");
  const [user, setUser] = useState("ds@gmail.com"); //remove the email before sending
  const [meal, setMeal] = useState(); //remove the email before sending
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
 
  const handleUser = (email) => {
    setUser(email);
  };
  const hideLogin = () => {
    setLoginIsShown(false);
  };
  const showRegister = (meal) => {
    setRegisterIsShown(true);
    setLoginIsShown(false);
  };
  const hideRegister = () => {
    setRegisterIsShown(false);
    setLoginIsShown(true);
  };
  const filterTypeHandler = (event) => {
    setFilterType(event.target.name);
    console.log(filterType);
  };

  const showReviewHandler = (mealId) => {
    setReviewIsShown(true);
    setMeal(mealId);
  };

  const hideReviewHandler = () => {
    setReviewIsShown(false);
  };
  const showFilterHandler = () => {
    setFilterIsShown(true);
  };

  const hideFilterHandler = () => {
    setFilterIsShown(false);
  };
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

  ///fetch reviews from the data base
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        "https://biteaway-c1fec-default-rtdb.firebaseio.com/reviews.json"
      );

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const data = await response.json();
      const loadedReviews = [];
      for (const key in data) {
        loadedReviews.push({
          id: key,
          meal: data[key].id,
          name:data[key].name,
          comment: data[key].comment,
          rate: data[key].rate,
        });
      }
      setReviews(loadedReviews);
      setIsLoading(false);
    };
    fetchReviews().catch((errorMes) => {
      setIsLoading(false);
      setError(errorMes.message);
    });
  }, []);

  if (isLoading) {
    console.log("in loading");
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
  return (
    <CartProvider>
      {loginIsShown && (
        <Login
          hideLogin={hideLogin}
          handleUser={handleUser}
          showRegister={showRegister}
        />
      )}
      {registerIsShown && !loginIsShown && (
        <Register showRegister={showRegister} reviews={reviews} hideRegister={hideRegister} />
      )}
      {reviewIsShown && (
        <Review reviews={reviews} meal={meal} onClose={hideReviewHandler} />
      )}
      {filterIsShown && (
        <Filter
          onClose={hideFilterHandler}
          filterTypeHandler={filterTypeHandler}
        />
      )}
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {historyIsShown && (
        <HistoryOrders user={user} onClose={hideHistoryHandler} />
      )}
      <Header
        onShowCart={showCartHandler}
        onShowHistory={showHistoryHandler}
        onShowFilter={showFilterHandler}
        filterType={filterType}
      />
      <main>
        <Meals
          reviews={reviews}
          onShowReview={showReviewHandler}
          filterType={filterType}
        />
      </main>
    </CartProvider>
  );
}

export default App;
