import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css"

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const validationSchema = Yup.object({
  input: Yup.string()
    .required("This field is required.")
    .test(
      "is-email-or-phone",
      "Enter a valid email or 10-digit mobile number.",
      (value) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const phoneRegex = /^[6-9]\d{9}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),
});

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { input: "" },
    validationSchema,
    onSubmit: (values) => {
      const otp = generateOTP();
      alert(`Your OTP is: ${otp}`);
      navigate("/verify-otp", { state: { otp } }); 
    },
  });

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
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: "80%" }}>
              <TextField
                variant="outlined"
                name="input"
                placeholder=" Enter e-mail or Phone number"
                value={formik.values.input}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              <Button
                type="button"
                className="otp-button"
                sx={{ mt: 5, color: "white", width: "200px", ml: 8 }}
                onClick={() => {
                  formik.validateForm().then((errors) => {
                    if (Object.keys(errors).length > 0) {
                      alert(errors.input); 
                    } else {
                      formik.handleSubmit(); 
                    }
                  });
                }}
              >
                Send OTP
              </Button>
            </form>
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

export default Login;
