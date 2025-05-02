import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const OTPVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedOtp = location.state?.otp || "";

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(passedOtp);

  const timerRef = useRef(null); // to store the timer reference

  const startTimer = () => {
    clearInterval(timerRef.current); // clear existing timer
    setTimeLeft(30);
    setShowResend(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer(); // start timer on mount

    return () => clearInterval(timerRef.current); // clean up on unmount
  }, []);

  const handleVerify = () => {
    if (otp === generatedOtp) {
      navigate("/dashboard");
    } else {
      alert("Invalid or expired OTP");
    }
  };

  const handleResend = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    startTimer();

    setTimeout(() => {
      alert("New OTP sent: " + newOtp);
    }, 100); 
  };

  return (
    <Box className="dashboard-container">
      <Typography
        variant="h4"
        align="center"
        sx={{ pt: 4, color: "#fff", fontWeight: "bold" }}
        className="nav-bg"
      >
        Analytics Dashboard
      </Typography>

      <Box className="main-content">
        <Box className="card-container">
          <Box className="left-section">
            <Typography variant="h6" sx={{ color: "#fff", mb: 4 }}>
              Verify OTP
            </Typography>
            <TextField
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "50%",
              }}
            >
              <Button
                sx={{ mt: 2, mr: 2, color: "white", textTransform: "none" }}
                variant="text"
                onClick={handleResend}
                disabled={!showResend}
              >
                Resend OTP
              </Button>

              {!showResend && (
                <Typography sx={{ mt: 2, color: "white" }}>
                  0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}s
                </Typography>
              )}
            </Box>

            <Button
              onClick={handleVerify}
              className="otp-button"
              sx={{ mt: 2, color: "white", width: "200px" }}
            >
              Verify OTP
            </Button>
          </Box>

          <Box className="right-section">
            <p>Web Application with Analytics Dashboard</p>
          </Box>
        </Box>
      </Box>

      <footer>
        © 2025, Greendzine Technologies Pvt. Ltd. All Rights Reserved.
      </footer>
    </Box>
  );
};

export default OTPVerify;
