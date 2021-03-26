import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

function UserContextProvider(props) {
  const history = useHistory();

  //create account
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [townCity, setTownCity] = useState("");
  const [postcodeZIP, setPostcodeZIP] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };
  const onChangeTownCity = (e) => {
    setTownCity(e.target.value);
  };
  const onChangePostcodeZIP = (e) => {
    setPostcodeZIP(e.target.value);
  };
  const onChangeStreetAddress = (e) => {
    setStreetAddress(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //create object with users input
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      townCity: townCity,
      postcodeZIP: postcodeZIP,
      streetAddress: streetAddress,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
    };
    //check if password is confirmed
    if (confirmPassword !== password) {
      alert("Both passwords must be the same");
      setPassword("");
      setConfirmPassword("");
    } else {
      //set userInfo in local storage and logedIn to true
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("logedIn", JSON.stringify(true));
      history.push("/");
      setFirstName("");
      setLastName("");
      setEmailAddress("");
      setTownCity("");
      setPostcodeZIP("");
      setStreetAddress("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setLogedIn(true);
    }
  };

  //var for checkout info
  const [userData, setUserData] = useState({});
  const addUserDataToContext = (data) => {
    setUserData(data);
  };

  // var for orders
  const [userOrders, setUserOrders] = useState({
    userId: 1,
    orderHistory: [],
    firstname: "",
    lastname: "",
  });

  //boolean that tells if user has saved orders
  const [userOrderHistoryBoolean, setUserOrderHistoryBoolean] = useState(false);

  //get previous orders from local storage
  useEffect(() => {
    if (localStorage.getItem("orders") !== null) {
      setUserOrders(JSON.parse(localStorage.getItem("orders")));
    }
  }, []);

  //add new orders to previous orders
  const orderHistory = (purchases) => {
    setUserOrders((previousState) => ({
      orderHistory: [...previousState.orderHistory, purchases],
    }));
    setUserOrderHistoryBoolean(true);
  };

  //listens to if new orders are placed and adds them to local storage
  useEffect(() => {
    if (userOrderHistoryBoolean === true) {
      localStorage.setItem("orders", JSON.stringify(userOrders));
      setUserOrderHistoryBoolean(false);
      history.push("/shopping-cart/checkout/confirmation");
    }
  }, [userOrderHistoryBoolean]);


  //login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const onChangeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };
  const onChangeLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    //check if user is stored
    if (localStorage.getItem("userInfo") !== null) {
      //if user info exists, get data
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    } else {
      //else alert
      setLoginEmail("");
      setLoginPassword("");
      alert("Password or Email invalid! Please try again");
    }
  };

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    //if userInfo is not empty
    if (userInfo !== null) {
      //check if password and email match with input
      if (
        userInfo.password === loginPassword &&
        userInfo.emailAddress === loginEmail
      ) {
        //log in and save that user is loged in
        setLogedIn(true);
        setLoginEmail("");
        setLoginPassword("");
        localStorage.setItem("logedIn", JSON.stringify(true));
        history.push("/");
      } else {
        //else alert
        alert("Password or Email invalid! Please try again");
        setLoginEmail("");
        setLoginPassword("");
      }
    }
  }, [userInfo]);

  //var to check if user is logged in or not
  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    //check if there is saved data in local storage
    if (localStorage.getItem("logedIn") !== null) {
      //check if user is loged in
      if (JSON.parse(localStorage.getItem("logedIn")) === true) {
        setLogedIn(true);
      }
    }
  }, [logedIn]);

  //logout
  const logOut = () => {
    localStorage.setItem("logedIn", false);
    setLogedIn(false);
    history.push("/");
  };

  
  const validateName = (value) => {
    return value
      .replace(/^\s*\d*/, "")
      .replace(/[0-9]/g, "")
      .replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase());
  };

  const validatePostcode = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/\d{1,3}/g)
        ?.join(" ")
        .substr(0, 6) || ""
    );
  };

  const validateStreetAdress = (value) => {
    return value
      .replace(/^\s*\d*/, "")
      .replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase());
  };

  const validatePhoneNumber = (value) => {
    if (value.length <= 7) {
      return (
        value
          .replace(/\-/g, "")
          .match(/\d{1,3}/g)
          ?.join("-")
          .substring(0, 7) || ""
      );
    } else {
      const groupByThreeString = value.substring(0, 7);
      let groupByTwoString = value.substring(7, value.length);
      const groups = groupByTwoString.replace(/\s/g, "").match(/\d{1,2}/g);
      if (groups === null) {
        groupByTwoString = "";
      } else {
        groupByTwoString = groups.join("-");
      }
      return (
        (groupByThreeString + "-" + groupByTwoString).substring(0, 13) || ""
      );
    }
  };

  const validateCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/\d{1,4}/g)
        ?.join(" ")
        .substr(0, 19) || ""
    );
  };

  const validateExpDate = (value) => {
    return (
      value
        .replace(/\//g, "")
        .match(/\d{1,2}/g)
        ?.join("/")
        .substr(0, 5) || ""
    );
  };

  const validateCVC = (value) => {
    return (
      value
        .match(/\d{1,3}/g)
        ?.join("")
        .substr(0, 3) || ""
    );
  };
  const values = {
    userData,
    addUserDataToContext,
    userOrders,
    setUserOrders,
    orderHistory,
    onSubmit,
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
    logedIn,
    logOut,
    onChangeLoginEmail,
    loginEmail,
    onChangeLoginPassword,
    loginPassword,
    onSubmitLogin,
    validateName,
    validatePostcode,
    validateCardNumber,
    validateExpDate,
    validateCVC,
    validateStreetAdress,
    validatePhoneNumber,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
