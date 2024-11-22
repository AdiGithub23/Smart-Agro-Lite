//#region Original Code
// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   Link,
//   Box,
//   Avatar,
//   CssBaseline,
// } from "@mui/material";
// import DateTime from "../Components/DateTime";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ForgetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [code, setCode] = useState("");
//   const [codeError, setCodeError] = useState("");
//   const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setCodeError("");

//     try {
//       const response = await axios.post("/api/auth/verify-code", { code });
//       const { message, redirectUrl } = response.data;

//       setMessage(message);

//       if (redirectUrl) {
//         navigate(redirectUrl);
//       }
//     } catch (error) {
//       setCodeError("Verification failed. Please try again.");
//     }
//   };

//   const handleEmailVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post("/api/auth/forgot-password", { email });
//       setMessage(response.data.message);
//       setIsEmailSubmitted(true);
//     } catch (error) {
//       setError("User is not registered with the system");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//            backgroundColor:"#8FBAA6",
//           filter: "blur(2px)", // Add blur effect here
//           zIndex: -1,
//         },
//       }}
//     >
//       <Container maxWidth="sm">
//         <Box
//           sx={{
//             marginTop: 10,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent background
//             backdropFilter: "blur(10px)", // Blur effect
//             padding: 3,
//             borderRadius: 3,
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//             border: "1px solid rgba(255, 255, 255, 0.5)", // Optional subtle border
//           }}
//         >
//           <Avatar
//             src="/Images/logo.png"
//             sx={{ width: 56, height: 56 }}
//             variant="rounded"
//           />
//           <Box sx={{ marginTop: 4, marginLeft: 1 }}>
//             <Typography variant="h5" component="h1" gutterBottom>
//               Enter Your Email Address
//             </Typography>
//             <form onSubmit={handleEmailVerify}>
//               <TextField
//                 label="Email"
//                 variant="standard"
//                 fullWidth
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{ marginBottom: "20px" }}
//                 error={!!error}
//                 helperText={error}
//                 sx={{
//                   "& .MuiInputBase-root": {
//                     "&:after": {
//                       borderBottomColor: "green",
//                     },
//                   },
//                   "& input:-webkit-autofill": {
//                     WebkitBoxShadow:
//                       "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                     WebkitTextFillColor: "black",
//                     transition: "background-color 5000s ease-in-out 0s",
//                   },
//                   "&:-webkit-autofill": {
//                     WebkitBoxShadow:
//                       "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                     WebkitTextFillColor: "black",
//                     transition: "background-color 5000s ease-in-out 0s",
//                   },
//                 }}
//               />
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="success"
//                 fullWidth
//                 disabled={loading}
//               >
//                 {loading ? "PLEASE WAIT..." : "Submit"}
//               </Button>
//               <Box sx={{ marginTop: 3 }}>
//                 <Typography>
//                   Didn't get verification email?
//                   <Box component="span" sx={{ marginLeft: 1 }}>
//                     <Link href="#" className="links" underline="hover">
//                       Resend
//                     </Link>
//                   </Box>
//                 </Typography>
//               </Box>
//             </form>
//             {message && (
//               <Alert severity="success" style={{ marginTop: "20px" }}>
//                 {message}
//               </Alert>
//             )}
//             {isEmailSubmitted && (
//               <Box sx={{ marginTop: 4 }}>
//                 <Typography variant="h6" component="h2" gutterBottom>
//                   Enter Verification Code
//                 </Typography>
//                 <form onSubmit={handleVerify}>
//                   <TextField
//                     label="Verification Code"
//                     variant="standard"
//                     fullWidth
//                     required
//                     value={code}
//                     onChange={(e) => setCode(e.target.value)}
//                     style={{ marginBottom: "20px" }}
//                     error={!!codeError}
//                     helperText={codeError}
//                     sx={{
//                       "& .MuiInputBase-root": {
//                         "&:after": {
//                           borderBottomColor: "green",
//                         },
//                       },
//                       "& input:-webkit-autofill": {
//                         WebkitBoxShadow:
//                           "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                         WebkitTextFillColor: "black",
//                         transition: "background-color 5000s ease-in-out 0s",
//                       },
//                       "&:-webkit-autofill": {
//                         WebkitBoxShadow:
//                           "0 0 0 1000px rgba(177, 207, 193,0.7) inset",
//                         WebkitTextFillColor: "black",
//                         transition: "background-color 5000s ease-in-out 0s",
//                       },
//                     }}
//                   />
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="success"
//                     fullWidth
//                   >
//                     Verify
//                   </Button>
//                 </form>
//               </Box>
//             )}
//             <br />
//             <br />
//           </Box>
//         </Box>
//       </Container>
//       <DateTime />
//     </Box>
//   );
// };

// export default ForgetPassword;
//#endregion

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DateTime from "../Components/DateTime";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setCodeError("");

    try {
      const response = await axios.post("/api/auth/verify-code", { code });
      const { message, redirectUrl } = response.data;

      setMessage(message);

      if (redirectUrl) {
        navigate(redirectUrl);
      }
    } catch (error) {
      setCodeError("Verification failed. Please try again.");
    }
  };

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      setMessage(response.data.message);
      setIsEmailSubmitted(true);
    } catch (error) {
      setError("User is not registered with the system");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8FBAA6",
  };

  const formStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const alertStyle = {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#dff0d8",
    color: "#3c763d",
    border: "1px solid #d6e9c6",
    borderRadius: "5px",
  };

  const errorStyle = {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Forget Password</h2>
        <form onSubmit={handleEmailVerify}>
          <input
            type="email"
            placeholder="Enter your email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div style={errorStyle}>{error}</div>}
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "PLEASE WAIT..." : "Submit"}
          </button>
        </form>

        {message && <div style={alertStyle}>{message}</div>}

        {isEmailSubmitted && (
          <form onSubmit={handleVerify} style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Enter verification code"
              style={inputStyle}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            {codeError && <div style={errorStyle}>{codeError}</div>}
            <button type="submit" style={buttonStyle}>
              Verify
            </button>
          </form>
        )}

        <p style={{ marginTop: "20px" }}>
          Didn't get a verification email?{" "}
          <a href="#" style={{ color: "#007BFF", textDecoration: "none" }}>
            Resend
          </a>
        </p>
      </div>
      <DateTime />
    </div>
  );
};

export default ForgetPassword;
