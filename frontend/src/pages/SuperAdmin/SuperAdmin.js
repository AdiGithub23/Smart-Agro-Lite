// #region Original Code 
// import React, { useEffect, useState, useRef } from "react";
// import {
//   Container,
//   Button,
//   Typography,
//   Grid,
//   Box,
//   CssBaseline,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Paper,
// } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import NavBar from "../../Components/NavBar";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import axios from "axios";
// const schema = yup.object().shape({
//   email: yup
//   .string()
//   .matches(
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//     "Invalid email"
//   )
//   .required("Email is required"),
//   phoneNumber: yup
//     .string()
//     .matches(/^[0-9]+$/, "Phone number is not valid")
//     .min(10, "Phone number must be at least 10 digits")
//     .required("Phone Number is required"),
//   password: yup
//     .string()
//     // .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .max(12, "Password must be at most 12 characters")
//     .test('password-match', 'Both password fields must be filled to change password', function(value) {
//       return (!!value && !!this.parent.confirmPassword) || (!value && !this.parent.confirmPassword);
//     }),
//   confirmPassword: yup
//     .string()
//     // .required('Confirm Password is required')
//     .oneOf([yup.ref('password'), null], 'Passwords must match')
//     .test('passwords-match', 'Passwords must match', function(value) {
//       return this.parent.password === value;
//     }),
// });
// export default function SuperAdmin() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(""); 
//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmPassword(!showConfirmPassword);
//   const [initialValues, setInitialValues] = useState({
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     fullName: "",
//     companyName: "",
//     adminId: 1,
//     address: "",
//   });
//   const backgroundStyle = {
//     backgroundColor: "#8FBAA6",
//     backgroundSize: "cover",
//     minHeight: "auto",
//     width: "100%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     zIndex: -1,
//   };
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`/api/user/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("user data fetched: ", response.data);
//         const userData = response.data;
//         setInitialValues({
//           email: userData.email || "",
//           phoneNumber: userData.phone_number || "",
//           password: "",
//           confirmPassword: "",
//           fullName: userData.full_name || "",
//           companyName: userData.company || "",
//           adminId: userData.adminId || "",
//           address: userData.address || "",
//         });
//         console.log("Initial Values: ", initialValues);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };
//     fetchUserData();
//   }, []);
//   const handleSubmitForm = async (values, { resetForm }) => {
//     console.log("handleSubmitForm function triggered !!!");
//     try {
//       const allUsers = await axios.get(`/api/user/`);
//       console.log("allUsers data fetched: ", allUsers.data);
//       const allEmails = allUsers.data.map(user => user.email);
//       console.log("allEmails: ", allEmails);
//       const currentEmail = initialValues.email; 
//       if (allEmails.includes(values.email) && values.email !== currentEmail) {
//         alert("This email is already registered. Please use a different email.")
//         return; 
//       }
//       const formData = {
//         full_name: values.fullName,
//         address: values.address,
//         email: values.email,
//         // password: values.password,
//         phone_number: values.phoneNumber,
//         user_role: "super-admin",
//         company: values.companyName,
//         profile_picture: null,
//       };
//       // Include the password only if it has been provided
//       if (values.password && values.confirmPassword) {
//         formData.password = values.password;
//       }
//       console.log("Try Block Values  : ", values);
//       console.log("Try Block FromData: ", formData);
//       console.log("Matched Properties");
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `/api/user/1`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Sent Request");
//       console.log("User created successfully:", response.data);
//       // resetForm();
//       const userData = response.data;
//       setInitialValues({
//         email: userData.email || "",
//         phoneNumber: userData.phone_number || "",
//         password: "",
//         confirmPassword: "",
//         fullName: userData.full_name || "",
//         companyName: userData.company || "",
//         adminId: userData.adminId || "",
//         address: userData.address || "",
//       });
//       alert("The changes are saved successfully")
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };
//   return (
//     <div style={backgroundStyle}>
//       <div
//         style={{ height: "100vh", display: "flex", flexDirection: "column" }}
//       >
//         <NavBar />
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: { xs: "70px", sm: "110px", md: "60px", lg: "40px" },
//             padding: { xs: "10px", sm: "10px", md: "10px", lg: "5px" },
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 2,
//               width: "100%",
//               maxWidth: { xs: "800px", sm: "800px", md: "500px", lg: "500px" },
//               marginLeft: { xs: "0px", sm: "150px", md: "160px", lg: "200px" },
//               backgroundColor: "rgba(255, 255, 255, 0.5)",
//             }}
//           >
//             {successMessage && (
//               <div style={{ color: "green", fontWeight: "bold" }}>
//                 {successMessage}
//               </div>
//             )}
          
//             <Grid
//               container
//               alignItems="center"
//               spacing={2}
//               sx={{ maxWidth: 800 }}
//             >
//               <Formik
//                 validationSchema={schema}
//                 validateOnChange={false}
//                 validateOnBlur={false}
//                 onSubmit={handleSubmitForm}
//                 initialValues={initialValues}
//                 enableReinitialize={true}
//               >
//                 {({
//                   handleSubmit,
//                   handleChange,
//                   values,
//                   errors,
//                   resetForm,
//                   touched,
//                   handleBlur,
//                 }) => (
//                   <Container component="main" maxWidth="xs">
//                     <Box
//                       sx={{
//                         marginTop: 2,
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         backgroundColor: "rgba(255, 255, 255,)",
//                       }}
//                     >
//                       <Box
//                         component="form"
//                         onSubmit={handleSubmit}
//                         sx={{
//                           marginTop: {
//                             xs: "10px",
//                             sm: "1px",
//                             md: "5px",
//                             lg: "1px",
//                           },
//                         }}
//                       >
//                         <Grid container spacing={2}>
//                           <Grid
//                             item
//                             xs={12}
//                             sx={{
//                               marginTop: {
//                                 xs: "5px",
//                                 sm: "5px",
//                                 md: "5px",
//                                 lg: "5px",
//                               },
//                             }}
//                           >
//                             <Typography gutterBottom>Email*</Typography>
//                             <TextField
//                               fullWidth
//                               id="email"
//                               name="email"
//                               value={values.email}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               error={touched.email && !!errors.email}
//                               helperText={touched.email && errors.email}
//                               variant="outlined"
//                               placeholder="Email"
//                               sx={{
//                                 "& .MuiInputBase-root": {
//                                   "&:after": {
//                                     borderBottomColor: "green",
//                                   },
//                                 },
//                                 "& input:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                                 "&:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                               }}
//                             />
//                           </Grid>

//                           <Grid
//                             item
//                             xs={12}
//                             sx={{
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "5px",
//                                 md: "5px",
//                                 lg: "5px",
//                               },
//                             }}
//                           >
//                             <Typography gutterBottom>Phone Number*</Typography>
//                             <TextField
//                               fullWidth
//                               id="phoneNumber"
//                               name="phoneNumber"
//                               value={values.phoneNumber}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               error={
//                                 touched.phoneNumber && !!errors.phoneNumber
//                               }
//                               helperText={
//                                 touched.phoneNumber && errors.phoneNumber
//                               }
//                               variant="outlined"
//                               placeholder="Phone Number"
//                               sx={{
//                                 "& .MuiInputBase-root": {
//                                   "&:after": {
//                                     borderBottomColor: "green",
//                                   },
//                                 },
//                                 "& input:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                                 "&:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                               }}
//                             />
//                           </Grid>

//                           <Grid
//                             item
//                             xs={12}
//                             sx={{
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "30px",
//                                 md: "5px",
//                                 lg: "10px",
//                               },
//                             }}
//                           >
//                             <Typography gutterBottom>
//                               Change Password
//                             </Typography>
//                             <TextField
//                               fullWidth
//                               id="password"
//                               name="password"
//                               type={showPassword ? "text" : "password"}
//                               value={values.password}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               error={touched.password && !!errors.password}
//                               helperText={touched.password && errors.password}
//                               variant="outlined"
//                               placeholder="Change Password"
//                               sx={{
//                                 "& .MuiInputBase-root": {
//                                   "&:after": {
//                                     borderBottomColor: "green",
//                                   },
//                                 },
//                                 "& input:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                                 "&:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                               }}
//                               InputProps={{
//                                 endAdornment: (
//                                   <InputAdornment position="end">
//                                     <IconButton
//                                       aria-label="toggle password visibility"
//                                       onClick={handleClickShowPassword}
//                                       edge="end"
//                                     >
//                                       {showPassword ? (
//                                         <Visibility />
//                                       ) : (
//                                         <VisibilityOff />
//                                       )}
//                                     </IconButton>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                             />
//                           </Grid>

//                           <Grid
//                             item
//                             xs={12}
//                             sx={{
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "30px",
//                                 md: "5px",
//                                 lg: "10px",
//                               },
//                             }}
//                           >
//                             <Typography gutterBottom>
//                               Confirm Password
//                             </Typography>
//                             <TextField
//                               fullWidth
//                               id="confirmPassword"
//                               name="confirmPassword"
//                               type={showConfirmPassword ? "text" : "password"}
//                               value={values.confirmPassword}
//                               onChange={handleChange}
//                               onBlur={handleBlur}
//                               error={
//                                 touched.confirmPassword &&
//                                 !!errors.confirmPassword
//                               }
//                               helperText={
//                                 touched.confirmPassword &&
//                                 errors.confirmPassword
//                               }
//                               variant="outlined"
//                               placeholder="Confirm Password"
//                               sx={{
//                                 "& .MuiInputBase-root": {
//                                   "&:after": {
//                                     borderBottomColor: "green",
//                                   },
//                                 },
//                                 "& input:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                                 "&:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset",
//                                   WebkitTextFillColor: "black",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s",
//                                 },
//                               }}
//                               InputProps={{
//                                 endAdornment: (
//                                   <InputAdornment position="end">
//                                     <IconButton
//                                       aria-label="toggle confirm password visibility"
//                                       onClick={handleClickShowConfirmPassword}
//                                       edge="end"
//                                     >
//                                       {showConfirmPassword ? (
//                                         <Visibility />
//                                       ) : (
//                                         <VisibilityOff />
//                                       )}
//                                     </IconButton>
//                                   </InputAdornment>
//                                 ),
//                               }}
//                             />
//                           </Grid>

//                           <Grid
//                             item
//                             xs={6}
//                             md={4}
//                             sx={{
//                               textAlign: "center",
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "30px",
//                                 md: "10px",
//                                 lg: "30px",
//                               },
//                             }}
//                           >
//                             <Button
//                               type="submit"
//                               variant="contained"
//                               color="success"
//                               style={{ width: "100%" }}
//                               onClick={handleSubmit}
//                             >
//                               Save
//                             </Button>
//                           </Grid>
//                           <Grid
//                             item
//                             xs={6}
//                             md={4}
//                             sx={{
//                               textAlign: "center",
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "30px",
//                                 md: "10px",
//                                 lg: "30px",
//                               },
//                             }}
//                           >
//                             <Button
//                               variant="outlined"
//                               onClick={() => resetForm()}
//                               style={{ width: "100%" }}
//                             >
//                               Cancel
//                             </Button>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     </Box>
//                   </Container>
//                 )}
//               </Formik>
//             </Grid>
//           </Paper>
//         </Box>
//       </div>
//     </div>
//   );
// }
//#endregion



import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import axios from "axios";

export default function SuperAdmin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setInitialValues({
          email: userData.email || "",
          phoneNumber: userData.phone_number || "",
          password: "",
          confirmPassword: "",
          fullName: userData.full_name || "",
          companyName: userData.company || "",
          address: userData.address || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    // Validate form fields
    const formErrors = validateForm(initialValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const allUsers = await axios.get(`/api/user/`);
      const allEmails = allUsers.data.map((user) => user.email);
      const currentEmail = initialValues.email;

      if (allEmails.includes(initialValues.email) && initialValues.email !== currentEmail) {
        alert("This email is already registered");
        return;
      }

      const formData = {
        full_name: initialValues.fullName,
        address: initialValues.address,
        email: initialValues.email,
        phone_number: initialValues.phoneNumber,
        user_role: "super-admin",
        company: initialValues.companyName,
        profile_picture: null,
      };

      if (initialValues.password && initialValues.confirmPassword) {
        formData.password = initialValues.password;
      }

      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/user/1`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setInitialValues({
        email: userData.email || "",
        phoneNumber: userData.phone_number || "",
        password: "",
        confirmPassword: "",
        fullName: userData.full_name || "",
        companyName: userData.company || "",
        address: userData.address || "",
      });
      setSuccessMessage("The changes are saved successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const validateForm = (values) => {
    const formErrors = {};

    if (!values.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      formErrors.email = "Invalid email";
    }

    if (!values.phoneNumber) {
      formErrors.phoneNumber = "Phone number is required";
    }

    if (values.password !== values.confirmPassword) {
      formErrors.password = "Passwords must match";
    }

    return formErrors;
  };

  return (
    <div>
      <NavBar />
      <div style={{ padding: "100px", maxWidth: "500px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmitForm}>
          <div style={{ marginBottom: "10px" }}>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={initialValues.email}
              onChange={(e) => setInitialValues({ ...initialValues, email: e.target.value })}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Phone Number*</label>
            <input
              type="text"
              name="phoneNumber"
              value={initialValues.phoneNumber}
              onChange={(e) => setInitialValues({ ...initialValues, phoneNumber: e.target.value })}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            {errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Change Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={initialValues.password}
              onChange={(e) => setInitialValues({ ...initialValues, password: e.target.value })}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={initialValues.confirmPassword}
              onChange={(e) => setInitialValues({ ...initialValues, confirmPassword: e.target.value })}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "4px" }}>
              Save
            </button>
          </div>

          <div>
            <button type="button" onClick={() => setInitialValues({ ...initialValues })} style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px" }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
