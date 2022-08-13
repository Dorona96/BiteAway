import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import Meal from "./Meal/Meal";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  //fetch meals from data base
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://biteaway-c1fec-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const data = await response.json();
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
          rate: data[key].rate,
          pic: data[key].pic,
          type: data[key].type,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((errorMes) => {
      setIsLoading(false);
      setError(errorMes.message);
    });
  }, []);
  if (isLoading) {
    console.log("in loading available meals");
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {props.filterType === "All Meals"
            ? meals.map((meal) => (
                <Meal
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                  rate={meal.rate}
                  onShowReview={props.onShowReview}
                  reviews={props.reviews}
                  pic={meal.pic}
                />
              ))
            : meals
                .filter((meal) => meal.type === props.filterType)
                .map((meal) => (
                  <Meal
                    key={meal.id}
                    id={meal.id}
                    name={meal.name}
                    description={meal.description}
                    price={meal.price}
                    rate={meal.rate}
                    onShowReview={props.onShowReview}
                    reviews={props.reviews}
                    pic={meal.pic}
                  />
                ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
