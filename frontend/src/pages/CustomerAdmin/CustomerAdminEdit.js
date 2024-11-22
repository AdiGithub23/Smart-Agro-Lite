// import React, { useEffect, useState, useRef } from "react";
// import { alpha, styled } from "@mui/material/styles";
// import InputBase from "@mui/material/InputBase";
// import {
//   Avatar,
//   IconButton,
//   Grid,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   Paper,
//   Link,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { Formik } from "formik";
// import * as yup from "yup";
// import NavBar7 from "../../Components/NavBar7";
// import { useParams } from "react-router-dom";
// import DateTime from "../../Components/DateTime";
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
//   adminId: yup.string().required("Admin Id is required"),
//   password: yup
//     .string()
//     // .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .max(12, "Password must be at most 12 characters"),
//   fullName: yup.string().required("Full Name is required"),
//   companyName: yup.string().required("Company Name is required"),
//   // assignedDevices: yup.string().required('Assigned devices is required'),
//   assignedDevices: yup.string(),
//   address: yup.string().required("Address is required"),
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

// export default function CustomerAdminEdit() {
//   const MAX_FILE_SIZE = 5 * 1024 * 1024; 
//   const [successMessage, setSuccessMessage] = useState(""); 
//   const [fileError, setFileError] = useState(""); 
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const { userId } = useParams();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmPassword(!showConfirmPassword);
//   const [initialValues, setInitialValues] = useState({
//     profile_picture: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     fullName: "",
//     companyName: "",
//     adminId: userId,
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
//   const handleEditClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > MAX_FILE_SIZE) {
//         alert("Image size is too large. Maximum allowed size is 5MB.");
//         // setSuccessMessage("Image size is too large. Maximum allowed size is 5MB.");
//         // setTimeout(() => {
//         //   setSuccessMessage("");
//         // }, 2000);
//         setSelectedFile(null); // Reset the selected file
//       } else {
//         setSelectedFile(file);
//       }
//     }
//   };
//   const handleDeleteClick = (setFieldValue) => {
//     setSelectedFile(null);  
//     setFieldValue("profile_picture", "/Images/profile_pic.jpg");  
//   };


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `/api/user/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("user data fetched: ", response.data);

//         const userData = response.data;
//         setInitialValues({
//           profile_picture: userData.profile_picture || "",
//           email: userData.email || "",
//           phoneNumber: userData.phone_number || "",
//           password: "",
//           fullName: userData.full_name || "",
//           companyName: userData.company || "",
//           adminId: userData.adminId || userId,
//           address: userData.address || "",
//         });
//         console.log("Initial Values: ", initialValues);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleSubmitForm = async (values, { resetForm }) => {
//     console.log("handleSubmitForm function triggered !!!");
//     try {
//       // const formData = {
//       //   full_name: values.fullName,
//       //   address: values.address,
//       //   email: values.email,
//       //   // password: values.temporaryPassword,
//       //   phone_number: values.phoneNumber,
//       //   user_role: "customer-manager",
//       //   company: values.companyName,
//       //   profile_picture: null,
//       // };
//       // // Include the password only if it has been provided
//       // if (values.password) {
//       //   formData.password = values.password;
//       // }

//       const allUsers = await axios.get(`/api/user/`);
//       console.log("allUsers data fetched: ", allUsers.data);
//       const allEmails = allUsers.data.map(user => user.email);
//       console.log("allEmails: ", allEmails);
//       const currentEmail = initialValues.email; 
//       if (allEmails.includes(values.email) && values.email !== currentEmail) {
//         alert("This email is already registered. Please use a different email.")
//         // setSuccessMessage("This email is already registered. Please use another!");
//         // setTimeout(() => {
//         //   setSuccessMessage("");
//         // }, 2000);
//         return; 
//       }
      
//       const formData = new FormData();
//       formData.append("full_name", values.fullName);
//       formData.append("address", values.address);
//       formData.append("email", values.email);
//       formData.append("phone_number", values.phoneNumber);
//       formData.append("user_role", "customer-manager");
//       formData.append("company", values.companyName);
//       if (selectedFile) {
//         formData.append("profile_picture", selectedFile);
//       } else {
//         formData.append("profile_picture", values.profile_picture); 
//       }
//       if (values.password) {
//         formData.append("password", values.password);
//       }
//       console.log(values);
//       console.log(formData);
//       console.log("Matched Properties");

//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `/api/user/${values.adminId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Sent Request");
//       console.log("User created successfully:", response.data);
//       // resetForm();
      
//       const userData = response.data;
//       setInitialValues({
//         profile_picture: userData.profile_picture || '',
//         email: userData.email || '',
//         phoneNumber: userData.phone_number || '',
//         password: '', 
//         fullName: userData.full_name || '',
//         companyName: userData.company || '',
//         adminId: userData.adminId || userId, 
//         address: userData.address || '',
//       });

//       alert("The changes are saved successfully")
//       // setSuccessMessage("The changes are saved successfully ");
//       // setTimeout(() => {
//       //   setSuccessMessage("");
//       // }, 3000);

//     } catch (error) {
//       // const formData = {
//       //   full_name: values.fullName,
//       //   address: values.address,
//       //   email: values.email,
//       //   password: values.temporaryPassword,
//       //   phone_number: values.phoneNumber,
//       //   user_role: "customer-manager",
//       //   company: values.companyName,
//       //   profile_picture: null,
//       // };
//       // console.log(values);
//       // console.log(formData);
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
//             marginTop: { xs: "32px", sm: "125px", md: "120px", lg: "130px" },
//             padding: { xs: "0px", sm: "10px", md: "10px", lg: "5px" },
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 2,
//               width: "100%",
//               maxWidth: "800px",
//               marginLeft: { xs: "0px", sm: "170px", md: "170px", lg: "200px" },
//               backgroundColor: "rgba(255, 255, 255, 0.5)",
//             }}
//           >
//           {successMessage && (
//             <div style={{ color: "green", fontWeight: "bold" }}>
//               {successMessage}
//             </div>
//           )}
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
//                 // initialValues={{
//                 //   email: '',
//                 //     phoneNumber: '',
//                 //     password: '',
//                 //     fullName: '',
//                 //     companyName: '',
//                 //     assignedDevices:'',
//                 //     adminId: '',
//                 //     address: '',
//                 // }}
//               >
//                 {({
//                   handleSubmit,
//                   handleChange,
//                   values,
//                   errors,
//                   resetForm,
//                   touched,
//                   handleBlur,
//                   setFieldValue,
//                 }) => (
//                   <Grid item xs={12}>
//                     <Box
//                       component="form"
//                       onSubmit={handleSubmit}
//                       sx={{
//                         marginTop: {
//                           xs: "85px",
//                           sm: "20px",
//                           md: "5px",
//                           lg: "5px",
//                         },
//                       }}
//                     >
//                       <Grid container spacing={2}>
//                         <Grid
//                           item
//                           xs={12}
//                           sm={5}
//                           md={3}
//                           lg={3}
//                           display="flex"
//                           justifyContent="center"
//                         >
//                           <Box
//                             display="flex"
//                             alignItems="center"
//                             position="relative"
//                           >
//                           {/* Original
//                           <Avatar
//                             src="/broken-image.jpg"
//                             sx={{ width: 100, height: 100 }}
//                           /> */}
//                           {/* Can see the fetched image
//                           <Avatar
//                             src={values.profile_picture ? `/${values.profile_picture}` : "/broken-image.jpg"} 
//                             alt="User Profile Picture" sx={{ width: 100, height: 100 }}
//                           /> */}
//                           <Avatar
//                             src={
//                               selectedFile
//                                 ? URL.createObjectURL(selectedFile)  
//                                 : values.profile_picture  
//                                   ? `/${values.profile_picture}`
//                                   : "/broken-image.jpg"
//                             }
//                             alt="User Profile Picture" sx={{ width: 100, height: 100 }}
//                           />

//                             <Box
//                               position="absolute"
//                               bottom={0}
//                               display="flex"
//                               justifyContent="center"
//                               width="100%"
//                             >
//                               <IconButton
//                                 aria-label="edit"
//                                 onClick={handleEditClick}
//                               >
//                                 <EditIcon />
//                               </IconButton>
//                               <IconButton aria-label="delete" onClick={() => handleDeleteClick(setFieldValue)} >
//                                 <DeleteIcon />
//                               </IconButton>
//                             </Box>
//                           </Box>
//                         </Grid>
//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           style={{ display: "none" }}
//                           accept="image/png, image/jpeg, image/jpg"
//                           onChange={handleFileChange}
//                         />

//                         <Grid
//                           item
//                           xs={12}
//                           sm={7}
//                           md={3}
//                           lg={3}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "12px",
//                               md: "6px",
//                               lg: "20px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>User ID</Typography>
//                           <TextField
//                             fullWidth
//                             id="adminId"
//                             name="adminId"
//                             variant="outlined"
//                             value={"UID"+values.adminId}
//                             onChange={(e) => {
//                               handleChange(e);
//                               // fetchAdminData(e.target.value, setFieldValue);
//                             }}
//                             disabled
//                             onBlur={handleBlur}
//                             error={touched.adminId && !!errors.adminId}
//                             helperText={touched.adminId && errors.adminId}
//                             placeholder="UID 01"
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

//                         <Grid
//                           item
//                           xs={12}
//                           sm={12}
//                           md={6}
//                           lg={6}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "12px",
//                               md: "6px",
//                               lg: "20px",
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

//                         <Grid
//                           item
//                           xs={12}
//                           sm={6}
//                           md={4}
//                           lg={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "12px",
//                               md: "6px",
//                               lg: "20px",
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
//                             placeholder="CompanyName"
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

//                         <Grid
//                           item
//                           xs={12}
//                           sm={6}
//                           md={4}
//                           lg={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "12px",
//                               md: "6px",
//                               lg: "20px",
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

//                         <Grid
//                           item
//                           xs={12}
//                           sm={12}
//                           md={4}
//                           lg={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "12px",
//                               md: "6px",
//                               lg: "20px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Address*</Typography>
//                           <TextField
//                             fullWidth
//                             id="address"
//                             name="address"
//                             multiline
//                             variant="outlined"
//                             value={values.address}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.address && !!errors.address}
//                             helperText={touched.address && errors.address}
//                             placeholder="Address"
//                             sx={{
//                               "& .MuiInputBase-root": {
//                                 "&:after": {
//                                   borderBottomColor: "green",
//                                 },
//                               },
//                               "& .MuiInputBase-input": {
//                                 "&:-webkit-autofill": {
//                                   WebkitBoxShadow:
//                                     "0 0 0 1000px rgba(199, 221, 211) inset !important",
//                                   WebkitTextFillColor: "black !important",
//                                   transition:
//                                     "background-color 5000s ease-in-out 0s !important",
//                                 },
//                               },
//                             }}
//                           />
//                         </Grid>

//                         <Grid
//                           item
//                           xs={12}
//                           sm={6}
//                           md={6}
//                           lg={6}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "12px",
//                               md: "6px",
//                               lg: "20px",
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

//                         <Grid
//                           item
//                           xs={12}
//                           sm={6}
//                           md={6}
//                           lg={6}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "12px",
//                               md: "6px",
//                               lg: "20px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>
//                             Temporary Password
//                           </Typography>
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
//                             placeholder="Tempory Password"
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
//                                 sm: "15px",
//                                 md: "15px",
//                                 lg: "20px",
//                               },
//                               ml: 2,
//                               marginBottom: {
//                                 xs: "40px",
//                                 sm: "20px",
//                                 md: "35px",
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
//                             xs={3}
//                             sm={3}
//                             md={3}
//                             sx={{
//                               marginTop: {
//                                 xs: "20px",
//                                 sm: "15px",
//                                 md: "15px",
//                                 lg: "20px",
//                               },
//                               ml: 2,
//                               marginBottom: {
//                                 xs: "40px",
//                                 sm: "20px",
//                                 md: "35px",
//                                 lg: "0px",
//                               },
//                             }}
//                           >
//                             <Link href="/customeradminuser">
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
//       <DateTime />
//     </div>
//   );
// }



import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function CustomerAdminEdit() {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const { userId } = useParams();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initialValues, setInitialValues] = useState({
    profile_picture: "",
    email: "",
    phoneNumber: "",
    password: "",
    fullName: "",
    companyName: "",
    adminId: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = response.data;
        setInitialValues({
          profile_picture: userData.profile_picture || "",
          email: userData.email || "",
          phoneNumber: userData.phone_number || "",
          password: "",
          fullName: userData.full_name || "",
          companyName: userData.company || "",
          adminId: userData.adminId || userId,
          address: userData.address || "",
        });
        console.log(initialValues)
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [userId]);

  const validateForm = (values) => {
    const newErrors = {};
    if (!values.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
      newErrors.email = "Invalid email";
    }
    if (!values.phoneNumber.match(/^[0-9]{10,}$/)) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits";
    }
    if (values.password && (values.password.length < 8 || values.password.length > 12)) {
      newErrors.password = "Password must be 8-12 characters";
    }
    if (!values.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!values.address.trim()) {
      newErrors.address = "Address is required";
    }
    return newErrors;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("Image size is too large");
      } else {
        setSelectedFile(file);
      }
    }
  };
  const handleDeleteClick = () => {
    setSelectedFile(null);
    setInitialValues((prevValues) => ({
      ...prevValues,
      profile_picture: "/Images/profile_pic.jpg",
    }));
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formValues = new FormData(event.target);
    const values = Object.fromEntries(formValues.entries());
    setErrors(validateForm(values));

    if (Object.keys(errors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("full_name", values.fullName);
        formData.append("address", values.address);
        formData.append("email", values.email);
        formData.append("phone_number", values.phoneNumber);
        formData.append("user_role", "customer-manager");
        formData.append("company", values.companyName);
        if (selectedFile) {
          formData.append("profile_picture", selectedFile);
        } else {
          formData.append("profile_picture", values.profile_picture);
        }
        if (values.password) {
          formData.append("password", values.password);
        }
        await axios.put(`/api/user/${userId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("The changes are saved successfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Edit Customer Admin</h2>
      <div style={{ padding: "100px", maxWidth: "500px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmitForm} style={{ maxWidth: "600px", margin: "auto" }}>
      {/* Profile Image Section */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : initialValues.profile_picture || "/broken-image.jpg"
            }
            alt="User Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <div>
            <button type="button" onClick={() => fileInputRef.current.click()}>
              Edit
            </button>
            <button type="button" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div style={{ marginBottom: "10px" }}>
          <label>Full Name*</label>
          <input
            type="text"
            name="fullName"
            defaultValue={initialValues.fullName}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email*</label>
          <input
            type="email"
            name="email"
            defaultValue={initialValues.email}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number*</label>
          <input
            type="text"
            name="phoneNumber"
            defaultValue={initialValues.phoneNumber}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Address*</label>
          <input
            type="text"
            name="address"
            defaultValue={initialValues.address}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Company Name*</label>
          <input
            type="text"
            name="companyName"
            defaultValue={initialValues.companyName}
            disabled
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "space-between" }}>
          <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedFile(null);
              setInitialValues({})
              setErrors({});
            }}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Reset
          </button>
          <Link to="/adminsltuser">
            <button type="button" style={{ padding: "10px 20px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}
