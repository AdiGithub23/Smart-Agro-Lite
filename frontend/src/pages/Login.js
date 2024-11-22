//#region Original Code
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   Box,
//   Avatar,
//   InputAdornment,
//   IconButton,
//   CssBaseline,
// } from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
// import DateTime from "../Components/DateTime";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useNavigate} from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { Link as RouterLink } from 'react-router-dom';
// import { Link } from '@mui/material';

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleClickShowPassword = () => setShowPassword(!showPassword);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           const currentTime = Date.now() / 1000;

//           if (!decodedToken.exp) {
//             navigate("/login");
//             return;
//           }

//           if (decodedToken.exp < currentTime) {
//             localStorage.removeItem("token");
//             navigate("/login");
//           } else {
//             const isAuthenticated = decodedToken.role;

//             if (isAuthenticated) {
//               switch (decodedToken.role) {
//                 case "super-admin":
//                   navigate("/superadmin");
//                   break;
//                 case "slt-admin":
//                   navigate("/adminsltdashboard");
//                   break;
//                 case "customer-admin":
//                   navigate("/admincoustomerdashboard");
//                   break;
//                 case "customer-manager":
//                   navigate("/managerdashboard");
//                   break;
//                 default:
//                   navigate("/");
//               }
//             } else {
//               navigate("/login");
//             }
//           }
//         } catch (error) {
//           navigate("/login");
//         }
//       }
//     };
    
//     checkAuth();
//   }, [navigate]);
  
//   const login = async (email, password) => {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         navigate(data.redirectUrl || "/");
//       } else {
//         alert("Login failed: " + data.error);
//       }
//     } catch (error) {
//       alert("Login failed: An unexpected error occurred.");
//     }
//   };

//   const schema = yup.object().shape({
//     email: yup.string().email("Invalid email").required("Email is required"),
//     password: yup.string().required("Password is required"),
//   });

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
//             backgroundColor:"#8FBAA6"
            
//           },
//         }}
//       >
//         <Formik
//           validationSchema={schema}
//           validateOnChange={false}
//           validateOnBlur={false}
//           onSubmit={(values, { resetForm }) => {
//             login(values.email, values.password);
//             resetForm();
//           }}
//           initialValues={{ email: "", password: "" }}
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
//                   backgroundColor: "rgba(255, 255, 255, 0.3)",
//                   backdropFilter: "blur(10px)",
//                   padding: 3,
//                   borderRadius: 3,
//                   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                   border: "1px solid rgba(255, 255, 255, 0.5)",
//                 }}
//               >
//                 <Link component={RouterLink} to="/">
//                   <Avatar
//                     src="/Images/logo.png"
//                     sx={{ width: 56, height: 56 }}
//                     variant="rounded"
//                   />
//                 </Link>
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
//                   <Grid container spacing={5}>
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
//                               "0 0 0 1000px rgba(177, 207, 193, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(177, 207, 193, 0.7) inset",
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
//                         type={showPassword ? "text" : "password"}
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
//                               "0 0 0 1000px rgba(204, 240, 217, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                           "&:-webkit-autofill": {
//                             WebkitBoxShadow:
//                               "0 0 0 1000px rgba(204, 240, 217, 0.7) inset",
//                             WebkitTextFillColor: "black",
//                             transition: "background-color 5000s ease-in-out 0s",
//                           },
//                         }}
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <IconButton
//                                 aria-label="toggle password visibility"
//                                 onClick={handleClickShowPassword}
//                                 edge="end"
//                               >
//                                 {showPassword ? (
//                                   <Visibility />
//                                 ) : (
//                                   <VisibilityOff />
//                                 )}
//                               </IconButton>
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Link
//                       component={RouterLink}
//                         to="/forgetPassword"
//                         className="links"
//                         color="inherit"
//                         underline="hover"
//                       >
//                         <Typography
//                           variant="caption"
//                           display="block"
//                           gutterBottom
//                         >
//                           Forgot Password?
//                         </Typography>
//                       </Link>
//                     </Grid>
//                     <Grid item xs={12} style={{ textAlign: "center" }}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="success"
//                         className="submit"
//                       >
//                         LOGIN
//                       </Button>
//                     </Grid>
//                     <Grid item xs={12} style={{ textAlign: "center" }}>
//                       <Typography variant="subtitle2" gutterBottom>
//                         Have a Fazenda SmartAgro device?
//                         <Box component="span" sx={{ marginLeft: 1 }}>
//                           <Link
//                           component={RouterLink}
//                             to="/register"
//                             className="links"
//                             underline="hover"
//                           >
//                             Register Here
//                           </Link>
//                         </Box>
//                       </Typography>
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

import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import DateTime from "../Components/DateTime";

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            switch (decodedToken.role) {
              case "super-admin":
                navigate("/superadminuser");
                break;
              case "slt-admin":
                navigate("/adminsltuser");
                break;
              case "customer-admin":
                navigate("/customeradminuser");
                break;
              case "customer-manager":
                navigate("/manager");
                break;
              default:
                navigate("/");
            }
          }
        } catch (error) {
          navigate("/login");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid email address";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate(data.redirectUrl || "/");
          // console.log(data)
        } else {
          alert("Login failed: " + data.error);
        }
      } catch (error) {
        alert("Login failed: An unexpected error occurred.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <img
          src="/Images/logo.png"
          alt="Logo"
          style={styles.logo}
          onClick={() => navigate("/")}
        />
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email*</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              style={styles.input}
            />
            {formErrors.email && (
              <span style={styles.error}>{formErrors.email}</span>
            )}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password*</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {formErrors.password && (
              <span style={styles.error}>{formErrors.password}</span>
            )}
          </div>
          <div style={styles.linkGroup}>
            <RouterLink to="/forgetPassword" style={styles.link}>
              Forgot Password?
            </RouterLink>
          </div>
          <button type="submit" style={styles.button}>
            LOGIN
          </button>
          <div style={styles.linkGroup}>
            <p style={styles.text}>
              Have a Fazenda SmartAgro device?{" "}
              <RouterLink to="/register" style={styles.link}>
                Register Here
              </RouterLink>
            </p>
          </div>
        </form>
      </div>
      {/* <DateTime /> */}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#8FBAA6",
  },
  formWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    width: "300px",
    textAlign: "center",
  },
  logo: {
    width: "56px",
    height: "56px",
    marginBottom: "20px",
    cursor: "pointer",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "black",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  toggleButton: {
    marginTop: "5px",
    border: "none",
    backgroundColor: "transparent",
    color: "blue",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  linkGroup: {
    marginTop: "10px",
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
  text: {
    fontSize: "14px",
    color: "black",
  },
};
