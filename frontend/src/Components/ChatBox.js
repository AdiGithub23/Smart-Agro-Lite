// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   List,
//   ListItem,
//   Typography,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";

// const ChatBox = ({ userId }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [receiverId, setReceiverId] = useState();
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch messages
//   useEffect(() => {
//     setReceiverId(userId);
//     console.log(`View Message Button is Clicked !!! User Id: ${userId}`);

//     const fetchMessages = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `/api/messages/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("User Messages Fetched");
//         console.log(response.data);
//         setMessages(response.data || []);
//       } catch (err) {
//         console.error("Failed to fetch messages:", err);
//       } finally {
//         setLoading(false); // Set loading to false after fetching messages
//       }
//     };

//     fetchMessages();
//   }, [userId]);

//   // Send messages
//   const handleSendMessage = async () => {
//     if (inputValue.trim()) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post(
//           "/api/messages",
//           {
//             receiverId,
//             content: inputValue,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setMessages([
//           ...messages,
//           {
//             content: inputValue,
//             timestamp: new Date().toLocaleTimeString(),
//             type: "sent",
//           },
//         ]);
//         setInputValue("");
//       } catch (err) {
//         console.error("Failed to send message:", err);
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         width: "auto",
//         margin: "0 ",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           maxHeight: "300px",
//           overflowY: "auto",
//           mb: 2,
//           padding: 2,
//         }}
//       >
//         {loading ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100%",
//             }}
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <List>
//             {messages.map((message, index) => (
//               <ListItem
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   justifyContent:
//                     message.senderId === userId ? "flex-start" : "flex-end", // Sent messages on the right, received on the left
//                   textAlign: message.senderId === userId ? "left" : "right",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     maxWidth: "75%",
//                     backgroundColor:
//                       message.senderId === userId ? "#f0f0f0" : "#e1ffc7",
//                     padding: "8px",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
//                     {message.content}
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     {message.timestamp}
//                   </Typography>
//                 </Box>
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Paper>

//       <Box sx={{ display: "flex" }}>
//         <TextField
//           label="Type your message..."
//           variant="outlined"
//           fullWidth
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//           sx={{
//             "& .MuiInputBase-root": {
//               "&:after": {
//                 borderBottomColor: "green",
//               },
//             },
//             "& input:-webkit-autofill": {
//               WebkitBoxShadow: "0 0 0 1000px rgba(199, 221, 211) inset",
//               WebkitTextFillColor: "black",
//               transition: "background-color 5000s ease-in-out 0s",
//             },
//             "&:-webkit-autofill": {
//               WebkitBoxShadow: "0 0 0 1000px rgba(199, 221, 211) inset",
//               WebkitTextFillColor: "black",
//               transition: "background-color 5000s ease-in-out 0s",
//             },
//             marginRight: 1,
//           }}
//         />
//         <Button variant="contained" color="primary" onClick={handleSendMessage}>
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ChatBox;
