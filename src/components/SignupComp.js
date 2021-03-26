import styles from "../styles/LogIn.Module.css";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function SignupComp() {
  const {
    firstName,
    onChangeFirstName,
    lastName,
    onChangeLastName,
    emailAddress,
    onChangeEmailAddress,
    townCity,
    onChangeTownCity,
    postcodeZIP,
    onChangePostcodeZIP,
    streetAddress,
    onChangeStreetAddress,
    phone,
    onChangePhone,
    password,
    onChangePassword,
    confirmPassword,
    onChangeConfirmPassword,
    onSubmit,

    validateName,
    validatePostcode,
    validateStreetAdress,
    validatePhoneNumber
  } = useContext(UserContext);

  return (
    <form onSubmit={(e) => onSubmit(e)} className="LogIn-Container">
      <h2 className="d-flex align-items-center justify-content-center mt-2">
        SIGN UP
      </h2>
      <div className="rowZ d-flex align-items-center justify-content-center">
        <div className="col-10 col-md-5">
          <div className="form-group">

            <label>First Name</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Alicia"
              value={firstName}
              required
              onChange={(e) => {
                const { value } = e.target
                e.target.value = validateName(value)
                onChangeFirstName(e)
              }}
            ></input>

            <label>Last Name</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Brown"
              value={lastName}
              required
              onChange={(e) => {
                const { value } = e.target
                e.target.value = validateName(value)
                onChangeLastName(e)
              }}
            ></input>


            <label>Email Address</label>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="ex@example.com"
              value={emailAddress}
              required
              onChange={onChangeEmailAddress}
            ></input>


            <label>Town / City</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Malmö"
              value={townCity}
              required
              onChange={(e) => {
                const { value } = e.target
                e.target.value = validateName(value)
                onChangeTownCity(e)
              }}
            ></input>


            <label>Postcode / ZIP</label>
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="cc-number"
              className="form-control mb-3"
              placeholder="222 25"
              value={postcodeZIP}
              required
              onChange={(e) => {
                const { value } = e.target
                e.target.value = validatePostcode(value)
                onChangePostcodeZIP(e)
              }}
            ></input>


            <label>Street Address</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nordanväg 28A"
              value={streetAddress}
              required
              onChange={(e) => {
                const { value } = e.target
                e.target.value = validateStreetAdress(value)
                onChangeStreetAddress(e)
              }}
            ></input>

            <label>Phone</label>
            <input
              className="form-control mb-3"
              placeholder="073-123-23-45"
              type="tel"
              inputMode="numeric"
              autoComplete="cc-number"
              value={phone}
              required
              onChange={(e) => {
                const { value } = e.target
                e.target.value = validatePhoneNumber(value)
                onChangePhone(e)
              }}

            ></input>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                required
                value={password}
                onChange={onChangePassword}
              ></input>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control mb-5"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              ></input>
            </div>
            <button
              type="submit"
              className={`${styles.loginButton} btn1 btn-primary mb-2 `}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignupComp;
