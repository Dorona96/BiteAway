import { useRef, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Login.module.css";

const Login = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  //fetch users
  const fetchUsers = async () => {
    const response = await fetch(
      "https://biteaway-c1fec-default-rtdb.firebaseio.com/users.json"
    );

    if (!response.ok) {
      throw new Error("Somthing went wrong!");
    }

    const data = await response.json();
    const loadedUsers = [];
    for (const key in data) {
      loadedUsers.push({
        id: key,
        email: data[key].email,
        password: data[key].password,
      });
    }
    setUsers(loadedUsers);
    setIsLoading(false);
  };
  fetchUsers().catch((errorMes) => {
    setIsLoading(false);
    setError(errorMes.message);
  });

  if (isLoading) {
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

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUser = users.filter(
      (user) => user.email === enteredEmail && user.password === enteredPassword
    );
    const enteredUserEmail = users.filter(
      (user) => user.email === enteredEmail
    );

    if (enteredUser[0]) {
      setFormInputValidity({
        email: true,
        password: true,
      });
      props.handleUser(enteredEmail)
      props.hideLogin();
    } else {
      if (enteredUserEmail[0]) {
        setFormInputValidity({
          email: true,
          password: false,
        });
      } else {
        setFormInputValidity({
          email: false,
          password: false,
        });
      }
    }
  };
  return (
    <Modal>
      <h1>Please Login</h1>
      <form className={classes.login} onSubmit={loginHandler}>
        <label>Your Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          id="email"
          ref={emailInputRef}
          required
        />
        {!formInputValidity.email && <p>not a valid email</p>}
        <label>Your Password</label>
        <input
          type="password"
          placeholder="fakePassword123!"
          id="password"
          ref={passwordInputRef}
          required
        />
        {!formInputValidity.password && <p>wrong password!</p>}
        <button>Login</button>
      </form>
      <div className={classes.go_register}>
        <p>Don't have a user?</p>
        <button onClick={props.showRegister}>Register</button>
      </div>
    </Modal>
  );
};

export default Login;
