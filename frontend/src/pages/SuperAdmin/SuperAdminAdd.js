// import React, { useState, useRef, useEffect } from "react";
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
// import NavBar from "../../Components/NavBar";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .matches(
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//       "Invalid email"
//     )
//     .required("Email is required"),
//   phoneNumber: yup
//     .string()
//     .matches(/^[0-9]+$/, "Phone number is not valid")
//     .min(10, "Phone number must be at least 10 digits")
//     .required("Phone Number is required"),
//   userId: yup.string(),
//   // .required('Admin Id is required'),
//   temporaryPassword: yup
//     .string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .max(12, "Password must be at most 12 characters"),
//   fullName: yup.string().required("Full Name is required"),
//   companyName: yup.string().required("Company Name is required"),
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

// export default function SuperAdminAdd() {
//   const navigate = useNavigate();
//   const MAX_FILE_SIZE = 5 * 1024 * 1024; 
//   const [successMessage, setSuccessMessage] = useState(""); 
//   const [fileError, setFileError] = useState(""); 
//   const [showPassword, setShowPassword] = useState(false);
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [nextUserId, setNextUserId] = useState("");
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:900px)");
//   const isDesktop = !isMobile && !isTablet;
//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const backgroundStyle = {
//     backgroundColor: "#8FBAA6",
//     padding: isMobile
//       ? "0px 0px 60px 0px "
//       : isTablet
//       ? "0px 0px 52px 0px "
//       : "0px 0px 0px 0px ",
//     minHeight: "100vh",
//     width: "100%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     zIndex: -1,
//   };

//   useEffect(() => {
//     const fetchNextUserId = async () => {
//       try {
//         const response = await axios.get("/api/user/next-id");
//         console.log("API Response:", response.data);
//         setNextUserId("UID" + response.data.nextUserId);
//       } catch (error) {
//         console.error("Error fetching next user ID:", error);
//       }
//     };

//     fetchNextUserId();
//   }, []);

//   const handleEditClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > MAX_FILE_SIZE) {
//         alert("Image size is too large. Maximum allowed size is 5MB.")
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
//   const handleResetForm = (resetForm) => {
//     resetForm();
//     setSelectedFile(null); 
//   };

//   const handleSubmitForm = async (values, { resetForm }) => {
//     try {
//       const allUsers = await axios.get(`/api/user/`);
//       console.log("allUsers data fetched: ", allUsers.data);
//       const allEmails = allUsers.data.map(user => user.email);
//       console.log("allEmails: ", allEmails);
//       const currentEmail = values.email; 
//       console.log("values.email: ", values.email);
//       console.log("currentEmail: ", currentEmail);
//       if (allEmails.includes(currentEmail)) {
//         alert("This email is already registered. Please use a different email.")
//         // setSuccessMessage("This email is already registered. Please use another!");
//         // setTimeout(() => {
//         //   setSuccessMessage("");
//         // }, 2000);
//         return; 
//       }

//       const formData = {
//         full_name: values.fullName,
//         address: values.address,
//         email: values.email,
//         password: values.temporaryPassword,
//         phone_number: values.phoneNumber,
//         user_role: "slt-admin",
//         company: values.companyName,
//         profile_picture: selectedFile,
//       };
//       console.log(values);
//       console.log(formData);
//       console.log("Matched Properties");

//       const token = localStorage.getItem("token");
//       const response = await axios.post("/api/user/", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("Sent Request");
//       console.log("User created successfully:", response.data);
//       alert("User added successfully")
//       // setSuccessMessage("User created successfully");
//       // setTimeout(() => {
//       //   setSuccessMessage("");
//       // }, 2000);
//       resetForm();
//       setSelectedFile(null);
//       // window.location.reload();
//       navigate("/superadminuser");

//     } catch (error) {
//       // const formData = {
//       //   full_name: values.fullName,
//       //   address: values.address,
//       //   email: values.email,
//       //   password: values.temporaryPassword,
//       //   phone_number: values.phoneNumber,
//       //   user_role: "slt-admin",
//       //   company: values.companyName,
//       //   profile_picture: selectedFile,
//       // };
//       // console.log(values)
//       // console.log(formData)
//       console.error("Error creating user:", error);
//       alert("Failed to add user");
//     }
//   };

//   return (
//     <div style={backgroundStyle}>
//       <NavBar />
//       <Box sx={{ display: "flex" }}>
//         <Box
//           component="form"
//           noValidate
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: { xs: "32px", sm: "70px", md: "80px", lg: "100px" },
//             padding: { xs: "0px", sm: "10px", md: "0px", lg: "5px" },
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 2,
//               width: "100%",
//               height: "auto",
//               maxWidth: "800px",
//               marginLeft: { xs: "0px", sm: "150px", md: "145px", lg: "200px" },
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
//                 initialValues={{
//                   email: "",
//                   phoneNumber: "",
//                   temporaryPassword: "",
//                   fullName: "",
//                   companyName: "",
//                   userId: nextUserId,
//                   address: "",
//                 }}
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
//                           sm: "15px",
//                           md: "2px",
//                           lg: "5px",
//                         },
//                       }}
//                     >
//                       <Grid container spacing={isMobile ? 1 : 2}>
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
//                             <Avatar
//                               src={
//                                 selectedFile
//                                   ? URL.createObjectURL(selectedFile)
//                                   : "/default-profile.jpg"
//                                   // : "/broken-image.jpg"
//                               }
//                               sx={{ width: 100, height: 100 }}
//                             />
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
//                               <IconButton
//                                 aria-label="delete"
//                                 onClick={() => setSelectedFile(null)}
//                               >
                              
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
//                               sm: "15px",
//                               md: "30px",
//                               lg: "40px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Admin ID</Typography>
//                           <TextField
//                             fullWidth
//                             id="userId"
//                             name="userId"
//                             variant="outlined"
//                             value={nextUserId}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.userId && !!errors.userId}
//                             helperText={touched.userId && errors.userId}
//                             placeholder="USER 01"
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
//                               sm: "25px",
//                               md: "30px",
//                               lg: "40px",
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
//                           sm={12}
//                           md={4}
//                           lg={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "25px",
//                               md: "35px",
//                               lg: "40px",
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
//                           md={4}
//                           lg={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "25px",
//                               md: "35px",
//                               lg: "40px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Company Name*</Typography>
//                           <TextField
//                             fullWidth
//                             id="companyName"
//                             name="companyName"
//                             variant="outlined"
//                             value={values.companyName}
//                             onChange={handleChange}
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

//                         <Grid
//                           item
//                           xs={12}
//                           sm={6}
//                           md={4}
//                           lg={4}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "25px",
//                               md: "35px",
//                               lg: "40px",
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
//                           md={6}
//                           lg={6}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "25px",
//                               md: "35px",
//                               lg: "40px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Address*</Typography>
//                           <TextField
//                             name="address"
//                             variant="outlined"
//                             fullWidth
//                             placeholder="Address"
//                             value={values.address}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.address && !!errors.address}
//                             helperText={
//                               touched.address && errors.address
//                             }
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
//                               sm: "25px",
//                               md: "35px",
//                               lg: "40px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>
//                             Temporary Password*
//                           </Typography>
//                           <TextField
//                             fullWidth
//                             id="temporaryPassword"
//                             name="temporaryPassword"
//                             type={showPassword ? "text" : "password"}
//                             value={values.temporaryPassword}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={
//                               touched.temporaryPassword &&
//                               !!errors.temporaryPassword
//                             }
//                             helperText={
//                               touched.temporaryPassword &&
//                               errors.temporaryPassword
//                             }
//                             variant="outlined"
//                             placeholder="Temporary Password"
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

//                         <Grid container justifyContent="flex-end" spacing={2}>
//                           <Grid
//                             item
//                             xs={3}
//                             sm={3}
//                             md={3}
//                             sx={{
//                               marginTop: {
//                                 xs: "40px",
//                                 sm: "45px",
//                                 md: "20px",
//                                 lg: "50px",
//                               },
//                               ml: 2,
//                             }}
//                           >
//                             <Button
//                               type="submit"
//                               variant="contained"
//                               color="success"
//                               fullWidth
//                               onClick={handleSubmit}
//                             >
//                               Add
//                             </Button>
//                           </Grid>
//                           <Grid
//                             item
//                             xs={3}
//                             sm={3}
//                             md={3}
//                             sx={{
//                               marginTop: {
//                                 xs: "40px",
//                                 sm: "45px",
//                                 md: "20px",
//                                 lg: "50px",
//                               },
//                               ml: 2,
//                             }}
//                           >
//                             <Button
//                               variant="outlined"
//                               onClick={() => {resetForm();
//                                 setSelectedFile(null);}}
//                              fullWidth
//                             >
//                               Reset
//                             </Button>
//                           </Grid>
//                           <Grid
//                             item
//                             xs={3}
//                             sm={3}
//                             md={3}
//                             sx={{
//                               marginTop: {
//                                 xs: "40px",
//                                 sm: "45px",
//                                 md: "20px",
//                                 lg: "50px",
//                               },
//                               ml: 2,
//                             }}
//                           >
//                             <Link href="/superadminuser">
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



import React, { useState, useEffect, useRef } from "react";
import NavBar from "../../Components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SuperAdminAdd() {
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  const [selectedFile, setSelectedFile] = useState(null);
  const [nextUserId, setNextUserId] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    temporaryPassword: "",
    companyName: "",
    address: "",
    userId: "",
  });

  useEffect(() => {
    const fetchNextUserId = async () => {
      try {
        const response = await axios.get("/api/user/next-id");
        setNextUserId("UID" + response.data.nextUserId);
        setFormValues((prevValues) => ({
          ...prevValues,
          userId: "UID" + response.data.nextUserId,
        }));
      } catch (error) {
        console.error("Error fetching next user ID:", error);
      }
    };
    fetchNextUserId();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formValues.fullName) errors.fullName = "Full Name is required";
    if (!formValues.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.email = "Invalid email format";
    if (!formValues.phoneNumber.match(/^[0-9]{10,}$/))
      errors.phoneNumber = "Phone Number must be at least 10 digits";
    if (formValues.temporaryPassword.length < 8 || formValues.temporaryPassword.length > 12)
      errors.temporaryPassword =
        "Password must be between 8 and 12 characters";
    if (!formValues.companyName) errors.companyName = "Company Name is required";
    if (!formValues.address) errors.address = "Address is required";
    return errors;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("Image size is too large");
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    }
  };
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleDeleteClick = () => {
    setSelectedFile(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const allUsers = await axios.get("/api/user/");
      const allEmails = allUsers.data.map((user) => user.email);
      if (allEmails.includes(formValues.email)) {
        alert("This email is already registered");
        return;
      }

      const formData = new FormData();
      formData.append("full_name", formValues.fullName);
      formData.append("address", formValues.address);
      formData.append("email", formValues.email);
      formData.append("password", formValues.temporaryPassword);
      formData.append("phone_number", formValues.phoneNumber);
      formData.append("user_role", "slt-admin");
      formData.append("company", formValues.companyName);
      if (selectedFile) formData.append("profile_picture", selectedFile);

      const token = localStorage.getItem("token");
      await axios.post("/api/user/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User added successfully");
      setFormValues({
        fullName: "",
        email: "",
        phoneNumber: "",
        temporaryPassword: "",
        companyName: "",
        address: "",
        userId: nextUserId,
      });
      setSelectedFile(null);
      navigate("/superadminuser");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const resetForm = () => {
    setFormValues({
      fullName: "",
      email: "",
      phoneNumber: "",
      temporaryPassword: "",
      companyName: "",
      address: "",
      userId: nextUserId,
    });
    setSelectedFile(null);
    setErrorMessages({});
  };

  return (
    <div style={{ padding: "20px" }}>
      <NavBar />
      <h1>Add SLT Admin</h1>
      <div style={{ padding: "100px", maxWidth: "500px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Profile Image Section */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <label>Profile Picture:</label>
          <div>
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) :  "/default-profile.jpg"}
              alt="Profile"
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} 
            />
            <button type="button" onClick={handleEditClick}>Edit</button>
            <button type="button" onClick={handleDeleteClick}>Delete</button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg" 
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>User ID:</label>
          <input type="text" value={nextUserId} disabled 
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <small style={{ color: "red" }}>{errorMessages.fullName}</small>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <small style={{ color: "red" }}>{errorMessages.email}</small>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChange} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <small style={{ color: "red" }}>{errorMessages.phoneNumber}</small>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formValues.companyName}
            onChange={handleChange} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <small style={{ color: "red" }}>{errorMessages.companyName}</small>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <small style={{ color: "red" }}>{errorMessages.address}</small>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Temporary Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="temporaryPassword"
            value={formValues.temporaryPassword}
            onChange={handleChange} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <small style={{ color: "red" }}>
            {errorMessages.temporaryPassword}
          </small>
        </div>

        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        <div style={{ marginBottom: "10px" }}>
          <button type="submit">Add</button>
          <button type="button" onClick={resetForm}>
            Reset
          </button>
          <button type="button" onClick={() => navigate("/superadminuser")}>
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
