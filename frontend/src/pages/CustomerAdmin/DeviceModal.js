// import React, { useState, useEffect } from "react";
// import { Modal, Box, Typography, Button, TextField } from "@mui/material";

// const DeviceModal = ({ open, handleClose, onAddData, initialValues }) => {
//   const now = new Date();
//   const currentDate = now.toISOString().split("T")[0];
//   const currentTime = now.toTimeString().slice(0, 5);
//   const [formValues, setFormValues] = useState({
//     title: "",
//     quantity: "",
//     unitPrice: "",
//     date: "",
//     time: "",
//   });

//   useEffect(() => {
//     if (open && initialValues) {
//       setFormValues({
//         ...initialValues,
//         time: initialValues.time || "",
//       });
//     } else {
//       setFormValues({
//         title: "",
//         quantity: "",
//         unitPrice: "",
//         date: currentDate,
//         time: currentTime,
//       });
//     }
//   }, [open, initialValues]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleAdd = () => {
//     if (onAddData) {
//       onAddData(formValues);
//     }
//     handleClose();
//   };
//   const deviceId = localStorage.getItem("DeviceID");

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: 280, sm: 500, md: 400, lg: 400 },
//           bgcolor: "rgba(199, 221, 211)",
//           border: "2px solid #000",
//           boxShadow: 24,
//           p: 4,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           height: "auto",
//           borderRadius: "20px",
//         }}
//       >
//         <Typography
//           variant="h6"
//           component="h2"
//           align="center"
//           fontWeight="bold"
//         >
//           {initialValues ? "Edit Yield Data" : "Add Yield Data"}
//         </Typography>
//         <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//             <Typography sx={{ minWidth: 100, mr: 2, fontWeight: "bold" }}>
//               Device
//             </Typography>
//             <Typography>Device {deviceId}</Typography>
//           </Box>
//           {[
//             { label: "Crop Name", name: "crop_name" },
//             { label: "Quantity", name: "quantity" },
//             { label: "Unit Price", name: "unit_price" },
//             { label: "Date", name: "date" },
//             { label: "Time", name: "time" },
//           ].map(({ label, name }) => (
//             <Box
//               key={name}
//               sx={{ display: "flex", alignItems: "center", mb: 2 }}
//             >
//               <Typography sx={{ minWidth: 100, mr: 2, fontWeight: "bold" }}>
//                 {label}
//               </Typography>
//               <TextField
//                 name={name}
//                 type={
//                   name === "date" ? "date" : name === "time" ? "time" : "text"
//                 }
//                 value={formValues[name] || ""}
//                 onChange={handleInputChange}
//                 variant="standard"
//                 fullWidth
//                 sx={{
//                   "& .MuiInputBase-root": {
//                     "&:after": {
//                       borderBottomColor: "green",
//                     },
//                   },
//                   "& input:-webkit-autofill": {
//                     WebkitBoxShadow: "0 0 0 1000px rgba(199, 221, 211) inset",
//                     WebkitTextFillColor: "black",
//                     transition: "background-color 5000s ease-in-out 0s",
//                   },
//                   "&:-webkit-autofill": {
//                     WebkitBoxShadow: "0 0 0 1000px rgba(199, 221, 211) inset",
//                     WebkitTextFillColor: "black",
//                     transition: "background-color 5000s ease-in-out 0s",
//                   },
//                 }}
//               />
//             </Box>
//           ))}
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//           <Button
//             onClick={handleAdd}
//             variant="contained"
//             color="success"
//             sx={{ mt: 2, ml: 3 }}
//           >
//             {initialValues ? "Save" : "Add"}
//           </Button>
//           <Button
//             onClick={handleClose}
//             variant="contained"
//             color="success"
//             sx={{ mt: 2, ml: 2 }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default DeviceModal;
