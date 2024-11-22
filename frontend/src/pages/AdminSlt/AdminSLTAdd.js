// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
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
// import * as yup from "yup";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { Formik } from "formik";
// import NavBar2 from "../../Components/NavBar2";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// const schema = Yup.object().shape({
//   email: yup
//   .string()
//   .matches(
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//     "Invalid email"
//   )
//   .required("Email is required"),
//   phoneNumber: Yup
//     .string()
//     .matches(/^[0-9]+$/, "Phone number is not valid")
//     .min(10, "Phone number must be at least 10 digits")
//     .required("Phone Number is required"),
//   adminId: Yup.string(),
//   //.required('Admin Id is required'),
//   temporaryPassword: Yup
//     .string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .max(12, "Password must be at most 12 characters"),
//   fullName: Yup.string().required("Full Name is required"),
//   companyName: Yup.string().required("Company name is required"),
//   address: Yup.string().required("Address is required"),
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

// export default function AdminSLTAdd() {
//   const MAX_FILE_SIZE = 5 * 1024 * 1024; 
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const fileInputRef = useRef(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [nextUserId, setNextUserId] = useState("");
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:1200px)");
//   const isDesktop = !isMobile && !isTablet;
//   const handleClickShowPassword = () => setShowPassword(!showPassword);
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
//     const fetchNextUserId = async () => {
//       try {
//         const response = await axios.get(
//           "/api/user/next-id"
//         );
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
//     console.log("handleSubmitForm function triggered !!!");
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
//         user_role: "customer-admin",
//         company: values.companyName,
//         profile_picture: selectedFile,
//       };
//       console.log(values);
//       console.log(formData);
//       console.log("Matched Properties");

//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "/api/user/",
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
//       alert("User added successfully")
//       // setSuccessMessage("User created successfully");
//       // setTimeout(() => {
//       //   setSuccessMessage("");
//       // }, 2000);
//       resetForm();
//       setSelectedFile(null);
//       navigate("/adminsltuser");
//     } catch (error) {
//       // const formData = {
//       //   full_name: values.fullName,
//       //   address: values.address,
//       //   email: values.email,
//       //   password: values.temporaryPassword,
//       //   phone_number: values.phoneNumber,
//       //   user_role: "customer-admin",
//       //   company: values.companyName,
//       //   profile_picture: selectedFile,
//       // };
//       // console.log(values);
//       // console.log(formData);
//       console.error("Error creating user:", error);
//       alert("Failed to add user");
//     }
//   };

//   return (
//     <div style={backgroundStyle}>
//       <NavBar2 />
//       <Box sx={{ display: "flex" }}>
//         <Box
//           component="form"
//           noValidate
//           sx={{
//             flexGrow: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: { xs: "32px", sm: "70px", md: "65px", lg: "120px" },
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
//                   adminId: nextUserId,
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
//                   setFieldValue,
//                 }) => (
//                   <Grid item xs={12}>
//                     <Box
//                       component="form"
//                       onSubmit={handleSubmit}
//                       sx={{
//                         marginTop: {
//                           xs: "25px",
//                           sm: "19px",
//                           md: "15px",
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
//                                   // : "/Images/profile_pic.jpg"
//                                   : "/broken-image.jpg"
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
//                               {/* <IconButton aria-label="delete" onClick={() => handleDeleteClick(setFieldValue)} > */}
//                                 <DeleteIcon />
//                               </IconButton>
//                             </Box>
//                           </Box>
//                         </Grid>
//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           style={{ display: "none" }}
//                           // onChange={(e) => {
//                           //   console.log(e.target.files[0]);
//                           // }}
//                           accept="image/*"
//                           // accept="image/png, image/jpeg, image/jpg"
//                           onChange={handleFileChange}
//                         />
//                         <Grid
//                           item
//                           xs={12}
//                           sm={7}
//                           md={3}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "20px",
//                               md: "25px",
//                               lg: "40px",
//                             },
//                           }}
//                         >
//                           <Typography gutterBottom>Admin ID</Typography>
//                           <TextField
//                             fullWidth
//                             id="adminId"
//                             name="adminId"
//                             variant="outlined"
//                             value={nextUserId}
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             error={touched.adminId && !!errors.adminId}
//                             helperText={touched.adminId && errors.adminId}
//                             placeholder="ADMIN 01"
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
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "30px",
//                               md: "25px",
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
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "30px",
//                               md: "25px",
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
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "30px",
//                               md: "25px",
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
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "30px",
//                               md: "25px",
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
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "30px",
//                               md: "25px",
//                               lg: "40px",
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
//                           sm={12}
//                           md={6}
//                           sx={{
//                             marginTop: {
//                               xs: "10px",
//                               sm: "30px",
//                               md: "25px",
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
//                                 sm: "35px",
//                                 md: "40px",
//                                 lg: "50px",
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
//                                 sm: "35px",
//                                 md: "40px",
//                                 lg: "50px",
//                               },
//                               ml: 2,
//                               marginBottom: {
//                                 xs: "40px",
//                                 sm: "0px",
//                                 md: "0px",
//                                 lg: "0px",
//                               },
//                             }}
//                           >
//                             <Button
//                               variant="outlined"
//                               onClick={() => handleResetForm(resetForm)}
//                               fullWidth
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
//                                 md: "40px",
//                                 lg: "50px",
//                               },
//                               ml: 2,
//                               marginBottom: {
//                                 xs: "40px",
//                                 sm: "0px",
//                                 md: "0px",
//                                 lg: "0px",
//                               },
//                             }}
//                           >
//                             <Link href="/adminsltuser">
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



import React, { useState, useRef, useEffect } from "react";
import NavBar2 from "../../Components/NavBar2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminSLTAdd() {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nextUserId, setNextUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);
  const [formValues, setFormValues] = useState({
    email: "",
    phoneNumber: "",
    temporaryPassword: "",
    fullName: "",
    companyName: "",
    adminId: "",
    address: "",
  });

  useEffect(() => {
    const fetchNextUserId = async () => {
      try {
        const response = await axios.get("/api/user/next-id");
        const newUserId = "UID" + response.data.nextUserId;
        setNextUserId(newUserId);
        setFormValues((prev) => ({ ...prev, adminId: newUserId }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchNextUserId();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formValues.fullName) errors.fullName = "Full Name is required";
    if (!formValues.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
      errors.email = "Invalid email";
    if (!formValues.phoneNumber.match(/^[0-9]{10,}$/))
      errors.phoneNumber = "Phone number must be at least 10 digits";
    if (!formValues.companyName) errors.companyName = "Company name is required";
    if (!formValues.address) errors.address = "Address is required";
    if (!formValues.temporaryPassword || formValues.temporaryPassword.length < 8 || formValues.temporaryPassword.length > 12)
      errors.temporaryPassword = "Password must be 8-12 characters";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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

  const handleResetForm = () => {
    setFormValues({
      email: "",
      phoneNumber: "",
      temporaryPassword: "",
      fullName: "",
      companyName: "",
      adminId: nextUserId,
      address: "",
    });
    setSelectedFile(null);
    setFormErrors({});
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const allUsers = await axios.get(`/api/user/`);
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
      formData.append("user_role", "customer-admin");
      formData.append("company", formValues.companyName);
      if (selectedFile) {
        formData.append("profile_picture", selectedFile);
      }

      const token = localStorage.getItem("token");
      await axios.post("/api/user/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User added successfully");
      handleResetForm();
      navigate("/adminsltuser");
    } catch (error) {
      console.error(error);
      alert("Failed to add user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <NavBar2 />
      <h1>Add Admin</h1>
      <div style={{ padding: "100px", maxWidth: "500px", margin: "auto", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmitForm}>
      {/* Profile Image Section */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <label>Profile Picture:</label>
          <div>
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Profile"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                !
              </div>
            )}
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
          <label>Admin ID:</label>
          <input type="text" value={nextUserId} disabled 
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formValues.fullName}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          {formErrors.fullName && <span>{formErrors.fullName}</span>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          {formErrors.email && <span>{formErrors.email}</span>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formValues.companyName}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          {formErrors.companyName && <span>{formErrors.companyName}</span>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          {formErrors.phoneNumber && <span>{formErrors.phoneNumber}</span>}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          {formErrors.address && <span>{formErrors.address}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Temporary Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="temporaryPassword"
            value={formValues.temporaryPassword}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}/>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {formErrors.temporaryPassword && (
            <span>{formErrors.temporaryPassword}</span>
          )}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <button type="submit">Add</button>
          <button type="button" onClick={handleResetForm}>
            Reset
          </button>
          <button type="button" onClick={() => navigate("/adminsltuser")}>
            Cancel
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
