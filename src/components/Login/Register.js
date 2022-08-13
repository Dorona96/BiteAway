import Modal from "../UI/Modal";
import { useRef, useState } from "react";
import classes from "./Login.module.css";
const Register = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const emailInputRef = useRef();
  const emailRepeatInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordRepeatInputRef = useRef();

  const submitRegisterHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch(
      "https://biteaway-c1fec-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      }
    );

    setIsSubmitting(false);
    setDidSubmit(true);
  };
  const registerHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredEmailRepeat = emailRepeatInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordRepeat = passwordRepeatInputRef.current.value;

    const enteredEmailValid =
      enteredEmailRepeat === enteredEmail ? true : false;

    const enteredPasswordValid =
      enteredPassword === enteredPasswordRepeat ? true : false;

    setFormInputValidity({
      email: enteredEmailValid,
      password: enteredPasswordValid,
    });
    if (!formInputValidity) {
      return;
    }

    submitRegisterHandler({
      email: enteredEmail,
      password: enteredPassword,
    });
  };

  return (
    <Modal>
      {!didSubmit && (
        <div>
          <h1>Please Register to BiteAway</h1>
          <form className={classes.login} onSubmit={registerHandler}>
            <label>Your Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              id="emailReg"
              ref={emailInputRef}
              required
            />
            <label>Repeat your Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              id="emailValidReg"
              ref={emailRepeatInputRef}
              required
            />
            {!formInputValidity.email && <p>email are not the same</p>}
            <label>Your Password</label>
            <input
              type="password"
              placeholder="fakePassword123!"
              id="passwordReg"
              ref={passwordInputRef}
              requiRepeat
            />
            <label>Repeat your Password</label>
            <input
              type="password"
              placeholder="fakePassword123!"
              id="passwordVaildReg"
              ref={passwordRepeatInputRef}
              required
            />
            {!formInputValidity.password && <p>password are not the same</p>}
            <button>Register</button>
          </form>
          <div className={classes.go_register}>
            <p>have a user?</p>
            <button onClick={props.hideRegister}>Login</button>
          </div>
        </div>
      )}
      {didSubmit && (
        <div>
          <h2>Congrats! </h2>
          <div className={classes.go_register}>
            <p>You have an account time to</p> <button onClick={props.hideRegister}>Login</button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Register;
