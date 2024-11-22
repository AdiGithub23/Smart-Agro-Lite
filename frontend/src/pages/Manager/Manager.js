// #region Original Code
// import React, { useEffect, useState } from "react";
// import { alpha, styled } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import {
//   Paper,
//   IconButton,
//   Grid,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   Link,
// } from "@mui/material";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { Formik } from "formik";
// import * as yup from "yup";
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
//     .required("Phone number is required"),
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
//   userId: yup.string().required("User Id is required"),
//   fullName: yup.string().required("Full Name is required"),
//   companyName: yup.string().required("Company Name is required"),
//   farmId: yup.string(),
//   farmName: yup.string(),
//   address: yup.string().required("Address is required"),
//   assignedDevices: yup.string(),
// });
// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "label + &": {
//     marginTop: theme.spacing(3),
//   },
//   "& .MuiInputBase-input": {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
//     border: "1px solid",
//     borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
//     fontSize: 16,
//     width: "auto",
//     padding: "10px 12px",
//     transition: theme.transitions.create([
//       "border-color",
//       "background-color",
//       "box-shadow",
//     ]),
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));

// export default function Manager() {
//   const MAX_FILE_SIZE = 5 * 1024 * 1024; 
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(""); 
//   const [errorMessage, setErrorMessage] = useState(""); 
//   const [fileError, setFileError] = useState(""); 
//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
//   const [initialValues, setInitialValues] = useState({
//     email: "",
//     phoneNumber: "",
//     password: "",
//     confirmPassword: "",
//     fullName: "",
//     companyName: "",
//     userId: "",
//     assignedDevices: "",
//     farmId: "",
//     farmName: "",
//     address: "",
//   });
//   const backgroundStyle = {
//     backgroundColor: "#8FBAA6",
//     backgroundSize: "cover",
//     minHeight: "100vh",
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
  
//         let devicesResponse = null;
//         try {
//           devicesResponse = await axios.get(`/api/device-manager/manager/${userData.id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           console.log("device data: ", devicesResponse.data);
//         } catch (deviceError) {
//           if (deviceError.response && deviceError.response.status === 404) {
//             console.warn("No devices found for this manager.");
//           } else {
//             console.error("Error fetching devices:", deviceError);
//           }
//           devicesResponse = { data: [] }; // Fallback to empty data
//         }
  
//         // Initialize empty sets for unique farm IDs and names
//         const farmIdsSet = new Set();
//         const farmNamesSet = new Set();
  
//         devicesResponse.data.forEach((device) => {
//           // Check if device and farm properties exist before adding them
//           if (device && device.farm_id) {
//             farmIdsSet.add(device.farm_id);
//           }
//           if (device && device.farm_name) {
//             farmNamesSet.add(device.farm_name);
//           }
//         });
  
//         // Convert sets to strings
//         const assignedFarmIds = Array.from(farmIdsSet).join(", FID");
//         const assignedFarmNames = Array.from(farmNamesSet).join(", ");
//         console.log("assigned unique farm ids fetched: ", assignedFarmIds);
//         console.log("assigned unique farm names fetched: ", assignedFarmNames);
  
//         const assignedDevices = devicesResponse.data
//           .filter(device => device && device.device_label) // Null check for device label
//           .map(device => device.device_label)
//           .join(", ");
//         console.log("assigned devices fetched: ", assignedDevices);
  
//         setInitialValues({
//           email: userData.email || "",
//           phoneNumber: userData.phone_number || "",
//           password: "",
//           confirmPassword: "",
//           fullName: userData.full_name || "",
//           address: userData.address || "",
//           companyName: userData.company || "",
//           userId: userData.id || "",
//           assignedDevices: assignedDevices || "",
//           farmId: assignedFarmIds || "",
//           farmName: assignedFarmNames || "",
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
//         user_role: "customer-manager",
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
//         `/api/user/${values.userId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Sent Request");
//       console.log("User created successfully:", response.data);
      
//       const me = await axios.get(`/api/user/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const myData = me.data;      
//       const devicesResponse = await axios.get(`/api/device-manager/manager/${myData.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });      
//       // Unique farm IDs and names
//       const farmIdsSet = new Set();
//       const farmNamesSet = new Set();
//       devicesResponse.data.map(device => {
//         if (device.farm_id) {
//           farmIdsSet.add(device.farm_id);
//         }
//         if (device.farm_name) {
//           farmNamesSet.add(device.farm_name);
//         }
//       });
//       // Sets into strings
//       const assignedFarmIds = Array.from(farmIdsSet).join(", FID");
//       const assignedFarmNames = Array.from(farmNamesSet).join(", ");
//       const assignedDevices = devicesResponse.data.map(device => device.device_label).join(", ");

//       setInitialValues({
//         email: myData.email || "",
//         phoneNumber: myData.phone_number || "",
//         password: "",
//         confirmPassword: "",
//         fullName: myData.full_name || "",
//         address: myData.address || "",
//         companyName: myData.company || "",
//         userId: myData.id || "",
//         assignedDevices: assignedDevices || "", 
//         farmId: assignedFarmIds || "",
//         farmName: assignedFarmNames || "",
//       });

//       alert("The changes are saved successfully")

//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   return (
//     <div style={backgroundStyle}>
      
//       <Box sx={{ display: "flex" }}>
//         <Box
//           component="form"
//           noValidate
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: { xs: "50px", sm: "110px", md: "80px", lg: "100px" },
//             padding: { xs: "0px", sm: "10px", md: "10px", lg: "5px" },
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 3,
//               marginLeft: { xs: "0px", sm: "180px", md: "180px", lg: "200px" },
//               width: "100%",
//               maxWidth: 800,
//               backgroundColor: "rgba(255, 255, 255, 0.5)",
//             }}
//           >
//             {successMessage && (
//               <div style={{ color: "green", fontWeight: "bold" }}>
//                 {successMessage}
//               </div>
//             )}          


//           <Grid
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
//                   <Grid item xs={12}>
//                     <Box
//                       component="form"
//                       onSubmit={handleSubmit}
//                       sx={{
//                         marginTop: {
//                           xs: "15px",
//                           sm: "22px",
//                           md: "2px",
//                           lg: "5px",
//                         },
//                       }}
//                     >
//                       <Grid container spacing={2}>
//                       {/* User Id */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={4}
//                           md={3}
//                           sx={{
//                             marginTop: {
//                               xs: "20px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>User ID</Typography>
//                           <TextField
//                             fullWidth
//                             id="userId"
//                             name="userId"
//                             variant="outlined"
//                             value={"UID"+values.userId}
//                             disabled
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.userId && !!errors.userId}
//                             helperText={touched.userId && errors.userId}
//                             placeholder="AGR001"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Full Name */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={8}
//                           md={9}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Full Name*</Typography>
//                           <TextField
//                             fullWidth
//                             id="fullName"
//                             name="fullName"
//                             variant="outlined"
//                             value={values.fullName}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.fullName && !!errors.fullName}
//                             helperText={touched.fullName && errors.fullName}
//                             placeholder="Full Name"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Phone Number */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={4}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Phone Number*</Typography>
//                           <TextField
//                             fullWidth
//                             id="phoneNumber"
//                             name="phoneNumber"
//                             value={values.phoneNumber}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.phoneNumber && !!errors.phoneNumber}
//                             helperText={
//                               touched.phoneNumber && errors.phoneNumber
//                             }
//                             variant="outlined"
//                             placeholder="Phone Number"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Email */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={8}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Email*</Typography>
//                           <TextField
//                             fullWidth
//                             id="email"
//                             name="email"
//                             variant="outlined"
//                             value={values.email}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.email && !!errors.email}
//                             helperText={touched.email && errors.email}
//                             placeholder="Email"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Company Name */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={12}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Company Name</Typography>
//                           <TextField
//                             fullWidth
//                             id="companyName"
//                             name="companyName"
//                             variant="outlined"
//                             value={values.companyName}
//                             onChange={handleChange}
//                             disabled
//                             onBlur={handleBlur}
//                             error={touched.companyName && !!errors.companyName}
//                             helperText={
//                               touched.companyName && errors.companyName
//                             }
//                             placeholder="Company Name"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Farm Id */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={4}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Farm ID</Typography>
//                           <TextField
//                             fullWidth
//                             id="farmId"
//                             name="farmId"
//                             variant="outlined"
//                             value={"FID"+values.farmId}
//                             onChange={handleChange}
//                             disabled
//                             onBlur={handleBlur}
//                             error={touched.farmId && !!errors.farmId}
//                             helperText={touched.farmId && errors.farmId}
//                             placeholder="Farm 01S"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Farm Name */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={8}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Farm Name</Typography>
//                           <TextField
//                             fullWidth
//                             id="farmName"
//                             name="farmName"
//                             variant="outlined"
//                             value={values.farmName}
//                             onChange={handleChange}
//                             disabled
//                             onBlur={handleBlur}
//                             error={touched.farmName && !!errors.farmName}
//                             helperText={touched.farmName && errors.farmName}
//                             placeholder="Farm Name"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Devices */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={12}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>
//                             Assigned Devices
//                           </Typography>
//                           <TextField
//                             fullWidth
//                             id="assignedDevices"
//                             name="assignedDevices"
//                             variant="outlined"
//                             value={values.assignedDevices}
//                             onChange={handleChange}
//                             disabled
//                             onBlur={handleBlur}
//                             error={
//                               touched.assignedDevices &&
//                               !!errors.assignedDevices
//                             }
//                             helperText={
//                               touched.assignedDevices && errors.assignedDevices
//                             }
//                             placeholder="Assigned Devices"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Address */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={12}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Address</Typography>
//                           <TextField
//                             fullWidth
//                             id="address"
//                             name="address"
//                             variant="outlined"
//                             value={values.address}
//                             onChange={handleChange}
//                             disabled
//                             onBlur={handleBlur}
//                             error={touched.address && !!errors.address}
//                             helperText={touched.address && errors.address}
//                             placeholder="Farm Name"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                           />
//                         </Grid>
//                         {/* Password */}
//                         <Grid
//                           item
//                           xs={12}
//                           sm={6}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Change Password</Typography>
//                           <TextField
//                             fullWidth
//                             id="password"
//                             name="password"
//                             type={showPassword ? "text" : "password"}
//                             value={values.password}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.password && !!errors.password}
//                             helperText={touched.password && errors.password}
//                             variant="outlined"
//                             placeholder="Change Password"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     edge="end"
//                                   >
//                                     {showPassword ? (
//                                       <Visibility />
//                                     ) : (
//                                       <VisibilityOff />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         </Grid>
//                         <Grid
//                           item
//                           xs={12}
//                           sm={6}
//                           md={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "10px",
//                               md: "3px",
//                               lg: "15px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>
//                             Confirm Password
//                           </Typography>
//                           <TextField
//                             fullWidth
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             type={showConfirmPassword ? "text" : "password"}
//                             value={values.confirmPassword}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={
//                               touched.confirmPassword &&
//                               !!errors.confirmPassword
//                             }
//                             helperText={
//                               touched.confirmPassword && errors.confirmPassword
//                             }
//                             variant="outlined"
//                             placeholder="Confirm Password"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& input:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                               "&:-webkit-autofill": {
//                                 WebkitBoxShadow:
//                                   "0 0 0 1000px rgba(199, 221, 211) inset",
//                                 WebkitTextFillColor: "black",
//                                 transition:
//                                   "background-color 5000s ease-in-out 0s",
//                               },
//                             }}
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle confirm password visibility"
//                                     onClick={handleClickShowConfirmPassword}
//                                     edge="end"
//                                   >
//                                     {showConfirmPassword ? (
//                                       <Visibility />
//                                     ) : (
//                                       <VisibilityOff />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                         </Grid>

//                         <Grid
//                           container
//                           justifyContent="flex-end"
//                           spacing={2}
//                           sx={{ mt: 1 }}
//                         >
//                           <Grid
//                             item
//                             xs={4}
//                             sm={4}
//                             md={4}
//                             sx={{
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "10px",
//                                 md: "1px",
//                                 lg: "15px",
//                               },
//                               ml: 2,
//                               marginBottom: {
//                                 xs: "40px",
//                                 sm: "0px",
//                                 md: "10px",
//                                 lg: "0px",
//                               },
//                             }}
//                           >
//                             <Button
//                               type="submit"
//                               variant="contained"
//                               color="success"
//                               fullWidth
//                               onClick={handleSubmit}
//                             >
//                               Save
//                             </Button>
//                           </Grid>
//                           <Grid
//                             item
//                             xs={4}
//                             sm={4}
//                             md={4}
//                             sx={{
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "10px",
//                                 md: "1px",
//                                 lg: "15px",
//                               },
//                               ml: 2,
//                               marginBottom: {
//                                 xs: "40px",
//                                 sm: "0px",
//                                 md: "30px",
//                                 lg: "0px",
//                               },
//                             }}
//                           >
//                             <Link href="/managerdashboard">
//                               <Button variant="outlined" fullWidth>
//                                 Cancel
//                               </Button>
//                             </Link>
//                           </Grid>
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   </Grid>
//                 )}
//               </Formik>
//             </Grid>
//           </Paper>
//         </Box>
//       </Box>
//     </div>
//   );
// }
//#endregion


import React, { useState, useEffect, useRef } from "react";
import NavBar6 from "../../Components/NavBar6";
import axios from "axios";

export default function Manager() {
  // const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const [initialValues, setInitialValues] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
    userId: "",
    assignedDevices: "",
    farmId: "",
    farmName: "",
    address: "",
  });

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

        let devicesResponse = null;
        try {
          devicesResponse = await axios.get(`/api/device-manager/manager/${userData.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (deviceError) {
          console.warn("No devices found");
          devicesResponse = { data: [] };
        }

        const farmIdsSet = new Set();
        const farmNamesSet = new Set();
        devicesResponse.data.forEach((device) => {
          if (device.farm_id) farmIdsSet.add(device.farm_id);
          if (device.farm_name) farmNamesSet.add(device.farm_name);
        });

        const assignedFarmIds = Array.from(farmIdsSet).join(", FID");
        const assignedFarmNames = Array.from(farmNamesSet).join(", ");
        const assignedDevices = devicesResponse.data
          .filter(device => device.device_label)
          .map(device => device.device_label)
          .join(", ");

        setInitialValues({
          email: userData.email || "",
          phoneNumber: userData.phone_number || "",
          password: "",
          confirmPassword: "",
          fullName: userData.full_name || "",
          address: userData.address || "",
          companyName: userData.company || "",
          userId: userData.id || "",
          assignedDevices: assignedDevices || "",
          farmId: assignedFarmIds || "",
          farmName: assignedFarmNames || "",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const validateForm = (values) => {
    const errors = {};
    // Simple validation checks
    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) errors.email = "Invalid email";
    if (!values.phoneNumber || values.phoneNumber.length !== 10) errors.phoneNumber = "Phone number must be 10 digits";
    if (values.password && values.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords must match";
    return errors;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const values = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      companyName: formData.get("companyName"),
      farmId: formData.get("farmId"),
      farmName: formData.get("farmName"),
      assignedDevices: formData.get("assignedDevices"),
      address: formData.get("address"),
    };

    const errors = validateForm(values);
    if (Object.keys(errors).length > 0) {
      alert("Please fix the errors before submitting");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/user/${values.userId}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("The changes are saved successfully");
      // Reset the form or update state here as needed
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error saving the data.");
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.size <= MAX_FILE_SIZE) {
  //     setFilePreview(URL.createObjectURL(file));
  //   } else {
  //     alert("File size exceeds the 5MB limit.");
  //   }
  // };

  return (
    <div className="manager-container">
    <NavBar6/>
    <div className="manager-content">
    <h1>Customer Manager</h1>
    <div style={{ padding: "100px", maxWidth: "500px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmitForm}>
        <div style={{ marginBottom: "10px" }}>
          <label>User ID</label>
          <input type="text" id="userId" name="userId" value={initialValues.userId} disabled />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Full Name*</label>
          <input
            type="text"
            name="fullName"
            defaultValue={initialValues.fullName} required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email*</label>
          <input type="email" id="email" name="email" defaultValue={initialValues.email} required 
            onChange={(e) => setInitialValues({ ...initialValues, email: e.target.value })}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number*</label>
          <input
            type="text"
            name="phoneNumber"
            defaultValue={initialValues.phoneNumber}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Company Name*</label>
          <input
            type="text"
            name="companyName"
            defaultValue={initialValues.companyName} required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Farm ID</label>
          <input
            type="text"
            name="farmId"
            defaultValue={initialValues.farmId}
            disabled
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Farm Name</label>
          <input
            type="text"
            name="farmName"
            defaultValue={initialValues.farmName}
            disabled
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Assigned Devices</label>
          <input
            type="text"
            name="assignedDevices"
            defaultValue={initialValues.assignedDevices}
            disabled
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address*</label>
          <input
            type="text"
            name="address"
            defaultValue={initialValues.address} required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Change Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            defaultValue={initialValues.password}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            defaultValue={initialValues.confirmPassword}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <button type="submit">Save Changes</button>
        <div>
          <button type="button" onClick={() => setInitialValues({})}>
            Cancel
          </button>
        </div>
      </form>
      </div>
      </div>

      <style jsx>{`
        .manager-container {
          display: flex;
          height: 100vh;
        }
        .manager-content {
          flex: 1; /* Take up remaining space */
          padding: 20px;
          overflow-y: auto; /* Ensure content scrolls if needed */
        }
      `}</style>
    </div>
  );
}
