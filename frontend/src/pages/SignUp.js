//#region Original Code
// import React, { useEffect } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Grid,
//   Box,
//   Avatar,
//   CssBaseline,
// } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const schema = yup.object().shape({
//     full_name: yup.string().required("Full Name is required"),
//     company: yup.string().required("Company Name is required"),
//     email: yup
//     .string()
//     .matches(
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//       "Invalid email"
//     )
//     .required("Email is required"),
//     phone_number: yup
//       .string()
//       .matches(/^[0-9]+$/, "Phone number is not valid")
//       .min(10, "Phone number must be at least 10 digits"),
//     password: yup
//       .string()
//       .required("Password is required")
//       .min(8, "Password must be at least 8 characters")
//       .max(12, "Password must be at most 12 characters"),
//     confirm_password: yup
//       .string()
//       .required("Confirm Password is required")
//       .oneOf([yup.ref("password"), null], "Passwords must match"),
//   });

//   const Register = async (
//     full_name,
//     email,
//     phone_number,
//     company,
//     password,
//     confirm_password
//   ) => {
//     const serial_no = sessionStorage.getItem("serial_no");
//     const secret_code = sessionStorage.getItem("secret_code");

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           full_name,
//           email,
//           phone_number,
//           company,
//           password,
//           confirm_password,
//           serial_no,
//           secret_code,
//         }),
//       });

//       const data = await response.json();
//       console.log("data", data);

//       if (response.ok) {
//         alert(data.message);
//         navigate(data.redirectURL);
//       } else {
//         alert("Registration error:", data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
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
//              backgroundColor:"#8FBAA6"
//           },
//         }}
//       >
//         <Formik
//           validationSchema={schema}
//           validateOnChange={false}
//           validateOnBlur={false}
//           onSubmit={(values, { resetForm }) => {
//             Register(
//               values.full_name,
//               values.email,
//               values.phone_number,
//               values.company,
//               values.password,
//               values.confirm_password
//             );
//             resetForm();
//           }}
//           initialValues={{
//             full_name: "",
//             email: "",
//             phone_number: "",
//             company: "",
//             password: "",
//             confirm_password: "",
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
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: "rgba(255, 255, 255, 0.1)",
//                   backdropFilter: "blur(10px)",
//                   padding: 3,
//                   border: "1px solid rgba(255, 255, 255, 0.3)",
//                   borderRadius: 3,
//                   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <Link href="/">
//                   <Avatar
//                     src="/Images/logo.png"
//                     sx={{ width: 56, height: 56 }}
//                     variant="rounded"
//                   />
//                 </Link>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="full_name"
//                         label="Full Name*"
//                         name="full_name"
//                         variant="standard"
//                         value={values.full_name}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.full_name && !!errors.full_name}
//                         helperText={touched.full_name && errors.full_name}
//                         InputLabelProps={{
//                           style: { color: "black" },
//                         }}
//                         sx={{
//                           "& .MuiInputBase-root": {
//                             "&:after": {
//                               borderBottomColor: "green",
//                             },
//                           },
//                           "& input:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="email"
//                         label="Email*"
//                         name="email"
//                         variant="standard"
//                         value={values.email}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.email && !!errors.email}
//                         helperText={touched.email && errors.email}
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
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="phone_number"
//                         label="Phone Number"
//                         name="phone_number"
//                         variant="standard"
//                         value={values.phone_number}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.phone_number && !!errors.phone_number}
//                         helperText={touched.phone_number && errors.phone_number}
//                         InputLabelProps={{
//                           style: { color: "black" },
//                         }}
//                         sx={{
//                           "& .MuiInputBase-root": {
//                             "&:after": {
//                               borderBottomColor: "green",
//                             },
//                           },
//                           "& input:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="company"
//                         label="Company Name*"
//                         name="company"
//                         variant="standard"
//                         value={values.company}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.company && !!errors.company}
//                         helperText={touched.company && errors.company}
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
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="password"
//                         label="Password*"
//                         name="password"
//                         type="password"
//                         variant="standard"
//                         value={values.password}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={touched.password && !!errors.password}
//                         helperText={touched.password && errors.password}
//                         InputLabelProps={{
//                           style: { color: "black" },
//                         }}
//                         sx={{
//                           "& .MuiInputBase-root": {
//                             "&:after": {
//                               borderBottomColor: "green",
//                             },
//                           },
//                           "& input:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         id="confirm_password"
//                         label="Confirm Password*"
//                         name="confirm_password"
//                         type="password"
//                         variant="standard"
//                         value={values.confirm_password}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         error={
//                           touched.confirm_password && !!errors.confirm_password
//                         }
//                         helperText={
//                           touched.confirm_password && errors.confirm_password
//                         }
//                         InputLabelProps={{
//                           style: { color: "black" },
//                         }}
//                         sx={{
//                           "& .MuiInputBase-root": {
//                             "&:after": {
//                               borderBottomColor: "green",
//                             },
//                           },
//                           "& input:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(154, 193, 175, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           mt: 3,
//                           mb: 2,
//                           backgroundColor: "#4caf50",
//                           color: "white",
//                         }}
//                       >
//                         Register
//                       </Button>
//                     </Grid>
//                     <Grid container justifyContent="flex-end">
//                       <Grid item>
//                         <Link href="#" variant="body2">
//                           Already have an account? Sign in
//                         </Link>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             </Container>
//           )}
//         </Formik>
//       </Box>
//     </div>
//   );
// }
//#endregion


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    company: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name) newErrors.full_name = "Full Name is required";
    if (!formData.company) newErrors.company = "Company Name is required";
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone_number.match(/^[0-9]+$/) || formData.phone_number.length < 10) {
      newErrors.phone_number = "Phone number must be at least 10 digits";
    }
    if (!formData.password || formData.password.length < 8 || formData.password.length > 12) {
      newErrors.password = "Password must be 8-12 characters";
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords must match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const serial_no = sessionStorage.getItem("serial_no");
    const secret_code = sessionStorage.getItem("secret_code");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, serial_no, secret_code }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate(data.redirectURL);
      } else {
        alert("Registration error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#8FBAA6" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <div>
          <label>Full Name*</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          {errors.full_name && <small style={{ color: "red" }}>{errors.full_name}</small>}
        </div>

        <div>
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          {errors.phone_number && <small style={{ color: "red" }}>{errors.phone_number}</small>}
        </div>

        <div>
          <label>Company Name*</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          {errors.company && <small style={{ color: "red" }}>{errors.company}</small>}
        </div>

        <div>
          <label>Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
        </div>

        <div>
          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          {errors.confirm_password && <small style={{ color: "red" }}>{errors.confirm_password}</small>}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {/* Already have an account? <a href="#" style={{ color: "#4caf50" }}>Sign in</a> */}
          
          <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}
