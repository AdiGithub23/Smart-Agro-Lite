//#region Original Code
// import React from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Grid,
//   Box,
//   Avatar,
//   CssBaseline,
// } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";
// import DateTime from "../Components/DateTime";

// export default function ChangePassword() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const schema = yup.object().shape({
//     newPassword: yup
//       .string()
//       .required("Password is required")
//       .min(8, "Password must be at least 8 characters")
//       .max(12, "Password must be at most 12 characters"),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("newPassword"), null], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   const handleSubmit = async (values, { resetForm }) => {
//     const codeSearch = new URLSearchParams(location.search);
//     const code = codeSearch.get("code");

//     if (!code) {
//       alert("Invalid or missing code.");
//       return;
//     }

//     try {
//       const response = await axios.post("/api/auth/reset-password", {
//         code,
//         password: values.newPassword,
//       });

//       alert(response.data.message);
//       resetForm();
//       navigate("/login");
//     } catch (err) {
//       alert(
//         err.response?.data?.message ||
//           "Password reset failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div>
//       <Box
//         sx={{
//           position: "relative",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor:"#8FBAA6",
//             filter: "blur(2px)", // Add blur effect here
//             zIndex: -1,
//           },
//         }}
//       >
//         <Formik
//           validationSchema={schema}
//           validateOnChange={false}
//           validateOnBlur={false}
//           onSubmit={handleSubmit}
//           initialValues={{
//             newPassword: "",
//             confirmPassword: "",
//           }}
//         >
//           {({
//             handleSubmit,
//             handleChange,
//             values,
//             errors,
//             touched,
//             handleBlur,
//           }) => (
//             <Container component="main" maxWidth="xs">
//               <CssBaseline />
//               <Box
//                 sx={{
//                   marginTop: 10,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent background
//                   backdropFilter: "blur(10px)", // Blur effect
//                   padding: 3,
//                   borderRadius: 3,
//                   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                   border: "1px solid rgba(255, 255, 255, 0.5)", // Optional subtle border
//                 }}
//               >
//                 <Avatar
//                   src="/Images/logo.png"
//                   sx={{ width: 56, height: 56 }}
//                   variant="rounded"
//                 />
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="newPassword"
//                         label="New Password*"
//                         name="newPassword"
//                         variant="standard"
//                         value={values.newPassword}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.newPassword && !!errors.newPassword}
//                         helperText={touched.newPassword && errors.newPassword}
//                         InputLabelProps={{
//                           style: { color: "black" }, // Change label color to black
//                         }}
//                         sx={{
//                           "& .MuiInputBase-root": {
//                             "&:after": {
//                               borderBottomColor: "green",
//                             },
//                           },
//                           "& input:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="confirmPassword"
//                         label="Confirm Password*"
//                         name="confirmPassword"
//                         variant="standard"
//                         value={values.confirmPassword}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={
//                           touched.confirmPassword && !!errors.confirmPassword
//                         }
//                         helperText={
//                           touched.confirmPassword && errors.confirmPassword
//                         }
//                         InputLabelProps={{
//                           style: { color: "black" }, // Change label color to black
//                         }}
//                         sx={{
//                           "& .MuiInputBase-root": {
//                             "&:after": {
//                               borderBottomColor: "green",
//                             },
//                           },
//                           "& input:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12} style={{ textAlign: "center" }}>
//                       <br />
//                       <br />
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="success"
//                         className="submit"
//                         fullWidth
//                       >
//                         Proceed
//                       </Button>
//                       <br />
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             </Container>
//           )}
//         </Formik>
//       </Box>
//       <DateTime />
//     </div>
//   );
// }
//#endregion

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formValues, setFormValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (formValues.newPassword.length < 8 || formValues.newPassword.length > 12) {
      newErrors.newPassword = "Password must be 8-12 characters long";
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear specific field error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const codeSearch = new URLSearchParams(location.search);
    const code = codeSearch.get("code");

    if (!code) {
      alert("Invalid or missing code.");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          password: formValues.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormValues({ newPassword: "", confirmPassword: "" });
        navigate("/login");
      } else {
        alert(data.message || "Password reset failed. Please try again.");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#8FBAA6",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          filter: "blur(2px)",
          zIndex: -1,
          backgroundColor: "#8FBAA6",
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/Images/logo.png"
            alt="Logo"
            style={{ width: "56px", height: "56px", borderRadius: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            New Password*
          </label>
          <input
            type="password"
            name="newPassword"
            value={formValues.newPassword}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.newPassword && (
            <small style={{ color: "red" }}>{errors.newPassword}</small>
          )}
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Confirm Password*
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          {errors.confirmPassword && (
            <small style={{ color: "red" }}>{errors.confirmPassword}</small>
          )}
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "green",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
