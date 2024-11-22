// #region Original Code
// import React, { useEffect, useState } from "react";
// import Popover from "@mui/material/Popover";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Paper from "@mui/material/Paper";
// import Divider from "@mui/material/Divider";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Collapse from "@mui/material/Collapse";
// import axios from 'axios';
// import { jwtDecode } from "jwt-decode";

// const NotificationBox = ({ anchorEl, open, onClose }) => {
//   const [expandedNotificationId, setExpandedNotificationId] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchUserId = () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           setUserId(decodedToken.id);
//         } catch (error) {
//           console.error("Invalid token:", error);
//         }
//       }
//     };

//     fetchUserId();
//   }, []);
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem('token');

//         // Fetch from the first API
//         const api1Response = await axios.get(`/api/notifications/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Fetch from the second API
//         const api2Response = await axios.get(`/api/notifications/receiver/${userId}`);

//         const api1Notifications = api1Response.data.success ? api1Response.data.notifications : [];
//         const api2Notifications = api2Response.data;

//         const combinedNotifications = [...api1Notifications, ...api2Notifications];

//         const sortedNotifications = combinedNotifications
//           .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
//           .slice(0, 5);

//         setNotifications(sortedNotifications);

//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();

//     // Poll for new notifications every 60 seconds
//     const intervalId = setInterval(fetchNotifications, 60000);

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, [userId]);
//   const markNotificationAsRead = async (notificationId, userId, notificationType) => {
//     try {
//       if(notificationType=="Message"){
//         await axios.put(`/api/notifications/message-read/${userId}/${notificationId}`);
//       }else{
//         await axios.put(`/api/notifications/read/${userId}/${notificationId}`);
//       }
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };
//   const handleNotificationClick = (id) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) =>
//         notification.id === id
//           ? { ...notification, isRead: true }
//           : notification
//       )
//     );

//     const clickedNotification = notifications.find(notification => notification.id === id);

//     if (clickedNotification && !clickedNotification.isRead) {
//       // Mark notification as read in the backend
//       markNotificationAsRead(id, userId, clickedNotification.notificationType);
//     }

//     setExpandedNotificationId(expandedNotificationId === id ? null : id);
    
//   };

//   return (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "right",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       PaperProps={{
//         style: {
//           width: 300,
//           maxHeight: "80vh",
//           overflowY: "auto",
//         },
//       }}
//     >
//       <Paper sx={{ padding: 2, backgroundColor: "rgba(199, 221, 211)" }}>
//         <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
//           <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
//             Notifications
//           </Typography>
//         </Box>
//         <Divider />
//         {notifications.length === 0 ? (
//       <Typography
//       sx={{
//         fontSize: "18px",
//         color: "gray",
//         textAlign: "center",  
//       }}
//       >No notifications to display</Typography>
//     ) : (
//         <List>
//           {notifications.map((notification) => (
//             <Box key={notification.id}>
//               <ListItem
//                 button
//                 onClick={() => handleNotificationClick(notification.id)}
//                 sx={{
//                   bgcolor: notification.isRead
//                     ? "inherit"
//                     : "rgba(0, 0, 255, 0.1)",
//                 }}
//               >
//                 <ListItemText
//                   primary={notification.notificationTitle}
//                   // primary={notification.notificationType}
//                   secondary={new Date(notification.createdAt).toLocaleString()} 
//                 />
//               </ListItem>
//               <Collapse
//                 in={expandedNotificationId === notification.id}
//                 timeout="auto"
//                 unmountOnExit
//               >
//                 <Box sx={{ paddingLeft: 4, paddingRight: 4, paddingBottom: 2 }}>
//                   <Typography variant="body2">
//                     {notification.message}
//                   </Typography>
//                 </Box>
//               </Collapse>
//               <Divider />
//             </Box>
//           ))}
//         </List>
//     )}
//       </Paper>
//     </Popover>
//   );
// };

// export default NotificationBox;
//#endregion

import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const NotificationBox = ({ anchorEl, open, onClose }) => {
  const [expandedNotificationId, setExpandedNotificationId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const api1Response = await axios.get(`/api/notifications/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const api2Response = await axios.get(`/api/notifications/receiver/${userId}`);
        const api1Notifications = api1Response.data.success
          ? api1Response.data.notifications
          : [];
        const api2Notifications = api2Response.data;
        const combinedNotifications = [...api1Notifications, ...api2Notifications];
        const sortedNotifications = combinedNotifications
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 60000);
    return () => clearInterval(intervalId);
  }, [userId]);

  const markNotificationAsRead = async (notificationId, userId, notificationType) => {
    try {
      const url =
        notificationType === "Message"
          ? `/api/notifications/message-read/${userId}/${notificationId}`
          : `/api/notifications/read/${userId}/${notificationId}`;
      await axios.put(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotificationClick = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    const clickedNotification = notifications.find((n) => n.id === id);
    if (clickedNotification && !clickedNotification.isRead) {
      markNotificationAsRead(id, userId, clickedNotification.notificationType);
    }
    setExpandedNotificationId(expandedNotificationId === id ? null : id);
  };

  if (!open) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.container}
        onClick={(e) => e.stopPropagation()} // Prevent closing on container click
      >
        <div style={styles.header}>
          <h2 style={styles.title}>Notifications</h2>
        </div>
        <div style={styles.divider}></div>
        {notifications.length === 0 ? (
          <p style={styles.noNotifications}>No notifications to display</p>
        ) : (
          <ul style={styles.list}>
            {notifications.map((notification) => (
              <li key={notification.id} style={styles.listItem}>
                <div
                  style={styles.listItemHeader}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <span style={styles.listItemTitle}>
                    {notification.notificationTitle}
                  </span>
                  <span style={styles.listItemDate}>
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
                {expandedNotificationId === notification.id && (
                  <div style={styles.collapseContent}>
                    <p style={styles.message}>{notification.message}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  header: {
    padding: "10px 15px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    color: "#333",
  },
  divider: {
    height: "1px",
    backgroundColor: "#ddd",
  },
  noNotifications: {
    textAlign: "center",
    padding: "15px",
    color: "#555",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    padding: "10px 15px",
    borderBottom: "1px solid #eee",
  },
  listItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  listItemTitle: {
    fontSize: "16px",
    color: "#333",
  },
  listItemDate: {
    fontSize: "12px",
    color: "#999",
  },
  collapseContent: {
    marginTop: "5px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
  },
  message: {
    margin: 0,
    fontSize: "14px",
    color: "#555",
  },
};

export default NotificationBox;
