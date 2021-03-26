import React, { useEffect, useState } from "react";
import LoginComp from "../components/LoginComp";
import SignupComp from "../components/SignupComp";
import styles from "../styles/LogIn.Module.css";

function LogIn() {
  // const { onSubmit } = useContext(UserContext);

  // var to see if login or signup should be rendered
  const [renderLoginBoolean, setRenderLoginBoolean] = useState(true);
  //listens to if button to re-render is pressed
  useEffect(() => {}, [renderLoginBoolean]);
  //button that tells page to render login
  const renderLogin = () => {
    setRenderLoginBoolean(true);
  };
  //button that tells page to render signup
  const renderSignup = () => {
    setRenderLoginBoolean(false);
  };

  {
    //checks if login should be rendered
    if (renderLoginBoolean === true) {
      return (
        <div>
          <LoginComp />
          <button
            onClick={() => renderSignup()}
            className={`${styles.buttonBtn2} btn btn-primary`}
          >
            Create an account here
          </button>
        </div>
      );
    //checks if signup should be rendered
    } else if (renderLoginBoolean === false) {
      return (
        <div>
          <SignupComp />
          <button
            onClick={() => renderLogin()}
            className={`${styles.buttonBtn2} btn btn-primary`}
          >
            Already have an account? Log in here
          </button>
        </div>
      );
    }
  }
}

export default LogIn;
