import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/login", {
          state: { msg: "Check Your Email for reset password" },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };
  return (
    <div className="forgotpassword">
      <div className="box">
        <h2 style={{ marginBottom: "20px" }}>Reset Password</h2>
        <div className="forgot">
          <h2>Forgot Password</h2>
          <p>For reset your password, enter your email address below</p>
          <TextField
            id="outlined-basic"
            label="Enter Email"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            style={{
              width: "100%",
              padding: "15px 0",
              borderRadius: "8px",
              background: "#5F35F5",
              marginTop: "20px",
            }}
            variant="contained"
            onClick={handlePasswordReset}
          >
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
