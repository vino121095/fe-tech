import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";
import NavBar from "../components/NavBar";
import logo from '../assets/payment logo.png'
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const LoggedUser = JSON.parse(localStorage.getItem('userData'));

  // Function to toggle modal visibility
  useEffect(() => {
    if (!LoggedUser) {
      navigate("/Auth/Login");
    }
  }, [LoggedUser, navigate]);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
    },
    successMessage: {
      textAlign: "center",
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
    },
    icon: {
      fontSize: "134px",
      color: "#28a745",
    },
    title: {
      fontSize: "64px",
      fontWeight: "700",
      marginBottom: "10px",
      color: "#28a745",
    },
    description: {
      fontSize: "18px",
      color: "#555",
      marginBottom: "30px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "15px !important",
      color: "#007bff",
      backgroundColor: "white",
      border: "1px solid #007bff",
      borderRadius: "4px",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      width: "200px",
      height: "70px",
      marginRight: "30px",
    },
  };

  return (
    <>
      <NavBar />
      <div className="paymentContainer">
        <div className="paymentLogo">
          <img src= {logo} alt="logo" />
        </div>
        <div style={styles.container}>
          <div style={styles.successMessage}>
            <div style={styles.icon}>
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div style={styles.title}>Success!</div>
            <div style={styles.description}>
              Your order has successfully been submitted
            </div>
            <button
              className="payBtn"
              style={styles.button}
              onClick={() => navigate("/")}
            >
              <i class="bi bi-arrow-left"></i> Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
