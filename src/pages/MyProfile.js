import styles from "../styles/MyProfile.Module.css";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import PreviousOrders from "../components/PreviousOrders";

function MyProfile() {
  const { userOrders } = useContext(UserContext); 

  // local storage for user's information 
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

   // returning the user's info : name, email, address ect. 
  return (
    <div className="container">
      <div className={`${styles.removeMargin} row`}>
        <h3 className="text-center mb-4">My Profile</h3>

        <div className={`${styles.customerInfo} col col-md-4 mx-auto`}>
          <table className="table table-responsive table-bordered">
            <thead>
              <tr>
                <td className="col-4 col-md-3">NAME:</td>
                <td className="col-8 col-md-9">
                  {userInfo.firstName} {userInfo.lastName}
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>ADDRESS:</td>
                <td>
                  {`${userInfo.streetAddress}, ${userInfo.townCity} ${userInfo.postcodeZIP}`}
                </td>
              </tr>
            </thead>

            <thead>
              <tr>
                <td>PHONE:</td>
                <td>{userInfo.phone}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>EMAIL:</td>
                <td>{userInfo.emailAddress}</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div className={styles.productOverview}>
        {(() => {
          if (userOrders.orderHistory.length !== 0) {
            return (
              <div>
                <h3 className="mt-5 mb-4 text-center">My Orders</h3>
                {userOrders.orderHistory.map((order, i) => (
                  <PreviousOrders key={i} order={order} />
                ))}
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
}

export default MyProfile;
