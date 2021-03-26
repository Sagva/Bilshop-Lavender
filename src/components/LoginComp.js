import styles from "../styles/LogIn.Module.css";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function LoginComp() {
  const {
    onChangeLoginEmail,
    loginEmail,
    onChangeLoginPassword,
    loginPassword,
    onSubmitLogin,
  } = useContext(UserContext);
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={(e) => onSubmitLogin(e)} >
        <h2 className="d-flex align-items-center justify-content-center mt-2">
          LOG IN
      </h2>
        <div className="rowZ d-flex align-items-center justify-content-center">
          <div className="col-10 col-md-5">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email Address"
                required
                onChange={onChangeLoginEmail}
                value={loginEmail}
              ></input>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  required
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={onChangeLoginPassword}
                  value={loginPassword}
                ></input>
              </div>
              <button
                type="submit"
                className={`${styles.loginButton} btn1 btn-primary mb-2 `}
              >
                Log in
            </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginComp;
