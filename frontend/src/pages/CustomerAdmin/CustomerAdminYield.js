// import React, { useState, useRef, useEffect } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardHeader,
//   Avatar,
//   IconButton,
//   Fab,
//   Tooltip,
//   Box,
//   TextField,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as RechartsTooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { red } from "@mui/material/colors";
// import NavBar7 from "../../Components/NavBar7";
// import DeviceModal from "../CustomerAdmin/DeviceModal";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";

// const CardContainer = styled("div")({
//   display: "flex",
//   flexWrap: "nowrap",
//   overflowX: "auto",
//   padding: "20px",
//   gap: "16px",
//   scrollbarWidth: "none",
//   msOverflowStyle: "none",
//   "&::-webkit-scrollbar": {
//     display: "none",
//   },
// });

// const ArrowButton = ({ direction, onClick }) => (
//   <IconButton
//     onClick={onClick}
//     sx={{
//       position: "absolute",
//       top: "50%",
//       [direction === "left" ? "left" : "right"]: 10,
//       transform: "translateY(-50%)",
//       backgroundColor: "#C4DAD0",
//       color: "#000",
//       "&:hover": { backgroundColor: "#B0BEB4" },
//       zIndex: 1,
//     }}
//   >
//     {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//   </IconButton>
// );

// const ScrollContainer = styled("div")({
//   position: "relative",
//   display: "flex",
//   alignItems: "center",
//   marginLeft: "250px",
//   marginTop: "100px",
// });

// const LeftArrowButton = styled(ArrowButton)({
//   left: 0,
// });

// const RightArrowButton = styled(ArrowButton)({
//   right: 0,
// });

// const CustomTooltip = ({ payload, label, active }) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     return (
//       <div
//         style={{
//           backgroundColor: "#fff",
//           border: "1px solid #ccc",
//           padding: "10px",
//         }}
//       >
//         <p>{`Date: ${label}`}</p>
//         <p>{`Crop Name: ${data.title || "No Crop Name"}`}</p>
//         {payload[0].dataKey === "revenue" && (
//           <p>{`Revenue: Rs ${data.revenue || "N/A"}`}</p>
//         )}
//         {payload[0].dataKey === "quantity" && (
//           <p>{`Quantity: ${data.quantity || "N/A"}`}</p>
//         )}
//         {payload[0].dataKey === "unit_price" && (
//           <p>{`Unit Price: Rs ${data.unit_price || "N/A"}`}</p>
//         )}
//       </div>
//     );
//   }
//   return null;
// };

// export default function CustomerAdminYield() {
//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const [cardsData, setCardsData] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const backgroundStyle = {
//     backgroundColor: "#8FBAA6",
//     padding: isMobile ? "0px 6px 100px 0px" : "0px 0px 100px 0px",
//     minHeight: "100vh",
//     width: "100%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     zIndex: -1,
//   };
//   const deviceId = localStorage.getItem("DeviceID");

//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchYieldDatabyDate();
//     } else {
//       fetchYieldData(5);
//     }
//   }, [startDate, endDate]);

//   const fetchYieldData = async (limit) => {
//     try {
//       const response = await axios.get(`/api/yield/tile/${deviceId}`);
//       const data = response.data;
//       setCardsData(data.slice(0, limit));
//     } catch (error) {
//       console.error("Error fetching yield data:", error);
//     }
//   };

//   const fetchYieldDatabyDate = async () => {
//     if (!startDate || !endDate) return;

//     try {
//       const response = await axios.get(`/api/yield/graph/${deviceId}`, {
//         params: {
//           startDate,
//           endDate,
//         },
//       });
//       setCardsData(response.data);
//     } catch (error) {
//       console.error("Error fetching yield data:", error);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       if (!startDate || !endDate) {
//         alert("Please select the start and end date");
//         return;
//       }

//       const response = await axios.get(`/api/yield/download/${deviceId}`, {
//         params: {
//           startDate,
//           endDate,
//           download: true,
//         },
//         responseType: "blob",
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "yield-data.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading CSV:", error);
//     }
//   };

//   const containerRef = useRef(null);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setEditData(null);
//   };

//   const transformData = (cardsData) => {
//     const result = {
//       revenueData: [],
//       quantityData: [],
//       unitPriceData: [],
//     };

//     const dataMap = new Map();

//     cardsData.forEach((card) => {
//       const date = new Date(card.date).toLocaleDateString();
//       const quantity = Number(card.quantity);
//       const unit_price = Number(card.unit_price);
//       const cropName = card.crop_name || "No Crop Name";
//       const title = card.crop_name || "No Title";

//       if (dataMap.has(date)) {
//         const existingData = dataMap.get(date);
//         existingData.quantity += quantity;
//         existingData.revenue += quantity * unit_price;
//         existingData.unit_price = existingData.revenue / existingData.quantity;
//         existingData.title = title;
//         existingData.cropName = cropName;
//       } else {
//         dataMap.set(date, {
//           quantity,
//           revenue: quantity * unit_price,
//           unit_price,
//           title,
//           cropName,
//         });
//       }
//     });

//     dataMap.forEach((values, date) => {
//       result.revenueData.push({
//         date,
//         revenue: values.revenue,
//         title: values.title,
//         cropName: values.cropName,
//       });
//       result.quantityData.push({
//         date,
//         quantity: values.quantity,
//         title: values.title,
//         cropName: values.cropName,
//       });
//       result.unitPriceData.push({
//         date,
//         unit_price: values.unit_price,
//         title: values.title,
//         cropName: values.cropName,
//       });
//     });

//     return result;
//   };
//   const handleEdit = (data) => {
//     setEditData(data);
//     setOpen(true);
//   };

//   const { revenueData, quantityData, unitPriceData } = transformData(cardsData);

//   const scroll = (direction) => {
//     if (containerRef.current) {
//       const scrollAmount = direction === "right" ? 300 : -300;
//       containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   const handleAddData = (newData) => {
//     try {
//       if (editData) {
//         axios.put(`/api/yield/edit/${editData.id}`, newData);
//         alert("Updated successfully");
//       } else {
//         axios.post(`/api/yield/add/${deviceId}`, newData);
//         alert("Added successfully");
//       }
//       fetchYieldData(5);
//       handleClose();
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Error saving data");
//     }
//   };

//   const handleDelete = (index) => {
//     setDeleteIndex(index);
//     setConfirmDeleteOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (deleteIndex !== null) {
//       const item = cardsData[deleteIndex];
//       try {
//         await axios.delete(`/api/yield/delete/${item.id}`);
//         fetchYieldData(5);
//         alert("Delete successfully");
//       } catch (error) {
//         console.error("Error deleting item:", error);
//       }
//     }
//     setConfirmDeleteOpen(false);
//   };

//   const handleShowTop20 = () => {
//     setStartDate("");
//     setEndDate("");
//     fetchYieldData(20);
//   };

//   let range;
//   if (isDesktop) {
//     range = 4;
//   } else if (isTablet) {
//     range = 1;
//   } else if (isMobile) {
//     range = 1;
//   }

//   return (
//     <div style={backgroundStyle}>
   

//       <Box
//         sx={{
//           mt: { xs: 11, sm: 18, md: 15, lg: 12 },
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Grid container spacing={2}>
//           {/*--------------------------------Top 20 button--------------------*/}
//           <Grid item xs={12} sm={4}>
//             <Button
//               variant="contained"
//               color="success"
//               sx={{
//                 marginLeft: { xs: 18, sm: 23, md: 25, lg: 40 },
//                 height: "50px",
//               }}
//               onClick={handleShowTop20}
//             >
//               Top 20
//             </Button>
//           </Grid>
//           {/*--------------------------------Date selection--------------------*/}
//           <Grid item xs={6} sm={2}>
//             <TextField
//               type="date"
//               label="From"
//               InputLabelProps={{ shrink: true }}
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               sx={{
//                 mx: 2,
//                 marginLeft: { xs: 1, sm: 3, md: 1, lg: 10 },
//                 "& .MuiInputBase-root": {
//                   "&:after": {
//                     borderBottomColor: "green",
//                   },
//                 },
//                 "& input:-webkit-autofill": {
//                   WebkitBoxShadow: "0 0 0 1000px rgba(255, 255, 255) inset",
//                   WebkitTextFillColor: "black",
//                   transition: "background-color 5000s ease-in-out 0s",
//                 },
//                 "&:-webkit-autofill": {
//                   WebkitBoxShadow: "0 0 0 1000px rgba(255, 255, 255) inset",
//                   WebkitTextFillColor: "black",
//                   transition: "background-color 5000s ease-in-out 0s",
//                 },
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} sm={2}>
//             <TextField
//               type="date"
//               label="To"
//               InputLabelProps={{ shrink: true }}
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               sx={{
//                 mx: 2,
//                 marginLeft: { xs: 1, sm: 7, md: 2, lg: 10 },
//                 "& .MuiInputBase-root": {
//                   "&:after": {
//                     borderBottomColor: "green",
//                   },
//                 },
//                 "& input:-webkit-autofill": {
//                   WebkitBoxShadow: "0 0 0 1000px rgba(255, 255, 255) inset",
//                   WebkitTextFillColor: "black",
//                   transition: "background-color 5000s ease-in-out 0s",
//                 },
//                 "&:-webkit-autofill": {
//                   WebkitBoxShadow: "0 0 0 1000px rgba(255, 255, 255) inset",
//                   WebkitTextFillColor: "black",
//                   transition: "background-color 5000s ease-in-out 0s",
//                 },
//               }}
//             />
//           </Grid>
//           {/*--------------------------------Download history button--------------------*/}
//           <Grid item xs={12} sm={3}>
//             <Button
//               variant="contained"
//               color="success"
//               sx={{
//                 marginLeft: { xs: 12, sm: 15, md: 4, lg: 10 },
//                 height: "50px",
//               }}
//               onClick={handleDownload}
//             >
//               Download History
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       <Tooltip title="Add or Manage Devices">
//         <Fab
//           color="primary"
//           onClick={handleOpen}
//           sx={{
//             position: "absolute",
//             right: { xs: 18, sm: 23, md: 20, lg: 40 },
//             top: { xs: 100, sm: 100, md: 105, lg: 110 },
//           }}
//         >
//           <AddIcon />
//         </Fab>
//       </Tooltip>
//       <DeviceModal
//         open={open}
//         handleClose={handleClose}
//         onAddData={handleAddData}
//         initialValues={editData}
//       />
//       {/*--------------------------------Cards--------------------*/}
//       <ScrollContainer
//         sx={{ mt: 0, mr: 1, ml: { xs: 0, sm: 21, md: 21, lg: 32 } }}
//       >
//         {cardsData.length > range && (
//           <ArrowButton direction="left" onClick={() => scroll("left")} />
//         )}
//         <CardContainer ref={containerRef}>
//           {cardsData.map((card, index) => (
//             <Card
//               key={index}
//               sx={{
//                 minWidth: 300,
//                 maxWidth: 345,
//                 minHeight: 150,
//                 maxHeight: 200,
//                 marginBottom: 0,
//                 marginLeft: 2,
//                 backgroundColor: "rgba(255, 255, 255, 0.5)",
//               }}
//             >
//               <CardHeader
//                 avatar={
//                   <Avatar sx={{ bgcolor: red[500] }}>
//                     {card.crop_name ? card.crop_name[0].toUpperCase() : "U"}
//                   </Avatar>
//                 }
//                 action={
//                   <>
//                     <Tooltip title="Edit">
//                       <IconButton onClick={() => handleEdit(card)}>
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip key={index.id} title="Delete">
//                       <IconButton onClick={() => handleDelete(index)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </>
//                 }
//                 title={card.crop_name || "Unknown Title"}
//                 subheader={`${card.date} ${card.time}`}
//               />
//               <CardContent>
//                 <Typography variant="body2" color="textSecondary">
//                   Quantity: {card.quantity} Kg
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Unit Price: Rs {card.unit_price}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Revenue: Rs {card.total}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </CardContainer>
//         {cardsData.length > range && (
//           <ArrowButton direction="right" onClick={() => scroll("right")} />
//         )}
//       </ScrollContainer>
//       {/*--------------------------------Total Revenue Graph--------------------*/}
//       <Grid container spacing={1} sx={{ mt: 0 }}>
//         <Grid
//           item
//           xs={12}
//           md={3.15}
//           sx={{ ml: { xs: 0, sm: 23, md: 23, lg: 34 } }}
//         >
//           <Card
//             sx={{ mr: 1, ml: 1, padding: 1, maxHeight: 300, overflow: "auto" }}
//           >
//             <CardContent>
//               <Typography fontSize={15} fontWeight={600}>
//                 Total Revenue
//               </Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={revenueData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <RechartsTooltip content={<CustomTooltip />} />
//                   <Legend />
//                   <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//         {/*--------------------------------Quantity Graph--------------------*/}
//         <Grid
//           item
//           xs={12}
//           md={3.15}
//           sx={{ ml: { xs: 0, sm: 23, md: 0, lg: 0 } }}
//         >
//           <Card
//             sx={{ mr: 1, ml: 1, padding: 1, maxHeight: 300, overflow: "auto" }}
//           >
//             <CardContent>
//               <Typography fontSize={15} fontWeight={600}>
//                 Quantity
//               </Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={quantityData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <RechartsTooltip content={<CustomTooltip />} />
//                   <Legend />
//                   <Line type="monotone" dataKey="quantity" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//         {/*--------------------------------Unit Price Graph--------------------*/}
//         <Grid
//           item
//           xs={12}
//           md={3.15}
//           sx={{ ml: { xs: 0, sm: 23, md: 0, lg: 0 } }}
//         >
//           <Card
//             sx={{ mr: 1, ml: 1, padding: 1, maxHeight: 300, overflow: "auto" }}
//           >
//             <CardContent>
//               <Typography fontSize={15} fontWeight={600}>
//                 Unit Price
//               </Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <LineChart data={unitPriceData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <RechartsTooltip content={<CustomTooltip />} />
//                   <Legend />
//                   <Line type="monotone" dataKey="unit_price" stroke="#ffc658" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//       {/*--------------------------------Delete Item--------------------*/}

//       <Dialog
//         open={confirmDeleteOpen}
//         onClose={() => setConfirmDeleteOpen(false)}
//         sx={{
//           "& .MuiDialog-paper": {
//             borderRadius: "20px",
//             backgroundColor: "rgba(199, 221, 211)",
//           },
//         }}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this item?
//         </DialogContent>
//         <DialogActions>
//           <Button color="primary" onClick={() => setConfirmDeleteOpen(false)}>
//             No
//           </Button>
//           <Button color="error" onClick={handleConfirmDelete}>
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
