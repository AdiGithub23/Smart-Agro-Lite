// #region Original Code
// import React, { useState, useRef, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import { Outlet } from 'react-router-dom';
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationBox from "./NotificationBox";
// import SideBar3 from "./SideBar3";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useNavigate } from "react-router-dom";
// import DeviceStatusButton from "./DeviceStatus";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { Avatar } from "@mui/material";

// const ScrollContainer = React.forwardRef(({ children }, ref) => (
//   <Box
//     ref={ref}
//     sx={{
//       display: "flex",
//       overflow: "hidden", // Hide scrollbar
//       width: "100%",
//       padding: 0.7,
//       position: "relative",
//       margin: "0 20px", // Add horizontal margin to the container
//     }}
//   >
//     {children}
//   </Box>
// ));
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
// export default function NavBar6() {
//   const [devices, setDevices] = useState([]);
//   const [selectedDeviceId, setSelectedDeviceId] = useState(null);
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const token = localStorage.getItem("token");
//   const decodedToken = jwtDecode(token);
//   const manager_id = decodedToken.id;
//   const [unreadAlertsCount, setUnreadAlertsCount] = useState(0);
//   const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

//   let range;
//   if (isDesktop) {
//     range = 4;
//   } else if (isTablet) {
//     range = 2;
//   } else if (isMobile) {
//     range = 1;
//   }

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const response = await axios.get(
//           `/api/device-manager/manager/${manager_id}`
//         );
//         setDevices(response.data);

//         if (!localStorage.getItem("DeviceID") && response.data.length > 0) {
//           const firstDeviceId = response.data[0].id.toString();
//           localStorage.setItem("DeviceID", firstDeviceId);
//           setSelectedDeviceId(firstDeviceId);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchDevices();
//   }, [manager_id]);

  
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const decodedToken = jwtDecode(token);
//     const userId = decodedToken.id;

//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`/api/user/${userId}`);
//         setUser(response.data);
//       } catch (error) {
//         console.error("Failed to decode token:", error);
//       };
//     }
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const savedDeviceId = localStorage.getItem("DeviceID");
//     setSelectedDeviceId(savedDeviceId);
//   }, []);

//   useEffect(() => {
//     const fetchUnreadAlertCount = async () => {
//       try {
//         const response = await axios.get(`/api/notifications/alerts/count/${manager_id}`);

//         if (response.data.success) {
//           setUnreadAlertsCount(response.data.unreadCount);
//         } else {
//           console.error('Failed to fetch unread notifications count: ', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching unread notifications count:', error);
//       }
//     };

//     fetchUnreadAlertCount();

//     const fetchUnreadMessageCount = async () => {
//       try {
//         const response = await axios.get(`/api/notifications/messages/count/${manager_id}`);

//         if (response.data.success) {
//           setUnreadMessagesCount(response.data.unreadCount);
//         } else {
//           console.error('Failed to fetch unread notifications count: ', response.data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching unread notifications count:', error);
//       }
//     };

//     fetchUnreadMessageCount();

//     // Optional: Refresh count every minute (60000 milliseconds)
//     const intervalId1 = setInterval(fetchUnreadMessageCount, 60000);
//     const intervalId2 = setInterval(fetchUnreadAlertCount, 60000);

//     return () => {
//       clearInterval(intervalId1);
//       clearInterval(intervalId2);
//     }; // Cleanup interval on component unmount
    
//   }, [manager_id]);

//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();
//   const containerRef = useRef(null);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
//   const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const isMenuOpen = Boolean(anchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleNotificationClick = (event) => {
//     setNotificationAnchorEl(event.currentTarget);
//     setIsNotificationBoxOpen(!isNotificationBoxOpen);
//   };

//   const handleNotificationBoxClose = () => {
//     setNotificationAnchorEl(null);
//     setIsNotificationBoxOpen(false);
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleNavigation = (page) => {
//     navigate(page);
//   };

//   const handleDeviceSelect = (device) => {
//     localStorage.setItem("DeviceID", device.id.toString());
//     setSelectedDeviceId(device.id.toString());
//     window.location.reload();
//   };

//   const scroll = (direction) => {
//     if (containerRef.current) {
//       const container = containerRef.current;
//       const scrollAmount = 300; // Adjust this value based on item width and spacing
//       if (direction === "left") {
//         container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//       }
//     }
//   };

//   const getDeviceBackgroundColor = (deviceId) => {
//     const savedDeviceId = localStorage.getItem("DeviceID");
//     return savedDeviceId === deviceId ? "rgba(255, 255, 255,0.3)" : "#8fbaa6";
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     ></Menu>
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar
//         position="fixed"
//         sx={{ backgroundColor:"rgba(143, 186, 166, 1)",boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", color: "#000", zIndex: 1100 }}
//       >
//         <Toolbar>
//           {isSmallScreen && (
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               onClick={handleDrawerToggle}
//               sx={{
//                 position: "absolute",
//                 top: theme.spacing(2),
//                 left: theme.spacing(2),
//                 zIndex: theme.zIndex.drawer + 1,
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           <Box sx={{ flexGrow: 1 }} />
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               position: "relative",
//               width: {
//                 xs: "calc(95% - 70px)",
//                 sm: "calc(95% - 180px)",
//                 md: "calc(100% - 230px)",
//                 lg: "calc(100% - 300px)",
//               }, // Adjust width to fit within AppBar
//             }}
//           >
//             {devices.length > range && (
//               <ArrowButton direction="left" onClick={() => scroll("left")} />
//             )}
//             <ScrollContainer ref={containerRef}>
//               {devices.map((device, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     padding: 1,
//                     margin: "0 10px", // Add margin to each item
//                     borderRadius: "10px",
//                     background: getDeviceBackgroundColor(device.id.toString()),
                    
//                     height:"57px",
//                     backdropFilter: "blur(10px)",
//                     minWidth: "200px",
//                     textAlign: "center",
//                     flexShrink: 0,
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleDeviceSelect(device)}
//                 >
//                   <DeviceStatusButton
//                     status={device.active_status}
//                     serialNumber={device.serial_no}
//                     // deviceName={"Device " + device.id}
//                     deviceName={device.device_label}
//                   />
//                 </Box>
//               ))}
//             </ScrollContainer>
//             {devices.length > range && (
//               <ArrowButton direction="right" onClick={() => scroll("right")} />
//             )}
//           </Box>
//           <Box sx={{ display: "flex" }}>
//             <IconButton
//               size="large"
//               aria-label="show new notifications"
//               color="inherit"
//               onClick={handleNotificationClick}
//             >
//               <Badge badgeContent={unreadAlertsCount+unreadMessagesCount} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={() => handleNavigation("/manager")}
//               color="inherit"
//             >
//                <Avatar
//                     src={user?.profile_picture ? user.profile_picture : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
//                     alt="Profile"
//                     style={{
//                       width: 30,
//                       height: 30,
//                       borderRadius: "50%",
//                     }}
//                   />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//       <SideBar3 open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
//       <NotificationBox
//         anchorEl={notificationAnchorEl}
//         open={isNotificationBoxOpen}
//         onClose={handleNotificationBoxClose}
//       />


// <div style={{ flexGrow: 1 }}>
//         <Outlet /> {/* This will render the nested routes */}
//       </div>
//     </Box>
//   );
// }
// #endregion


// Customer-Manager
// #region Code 2
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import NotificationBox from "./NotificationBox"; 
import SideBar3 from "./SideBar3"; 

export default function NavBar6() {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState([]);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();  
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const manager_id = decodedToken.id;

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`/api/device-manager/manager/${manager_id}`);
        setDevices(response.data);
        if (!localStorage.getItem("DeviceID") && response.data.length > 0) {
          const firstDeviceId = response.data[0].id.toString();
          localStorage.setItem("DeviceID", firstDeviceId);
          setSelectedDeviceId(firstDeviceId);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDevices();
  }, [manager_id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${manager_id}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [manager_id]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const alertResponse = await axios.get(`/api/notifications/alerts/count/${manager_id}`);
        const messageResponse = await axios.get(`/api/notifications/messages/count/${manager_id}`);
        
        setUnreadAlertsCount(alertResponse.data.unreadCount);
        setUnreadMessagesCount(messageResponse.data.unreadCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnreadCount();
    const intervalId = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(intervalId);
  }, [manager_id]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDeviceSelect = (device) => {
    localStorage.setItem("DeviceID", device.id.toString());
    setSelectedDeviceId(device.id.toString());
  };

  const handleNotificationClick = () => {
    setIsNotificationBoxOpen(!isNotificationBoxOpen);
  };

  const handleNavigation = (page) => {
    navigate(page);
  };

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNotificationBoxClose = () => {
    setNotificationAnchorEl(null);
    setIsNotificationBoxOpen(false);
  };

  return (
    <div className="navbar">
    <div className="navbar-container">
      {/* <div className="navbar-left">
        <button className="menu-button" onClick={handleDrawerToggle}>☰</button>
      </div> */}
      {/* <div className="menu-button" onClick={handleDrawerToggle}>
        <button>&#9776;</button> 
      </div> */}
      
      <div className="navbar-center">
        <div className="devices-container">
          {devices.length > 3 && (
            <button className="scroll-button" onClick={() => scroll("left")}>←</button>
          )}
          <div ref={containerRef} className="devices-list">
            {devices.map((device, index) => (
              <div
                key={index}
                className={`device-item ${selectedDeviceId === device.id.toString() ? 'selected' : ''}`}
                onClick={() => handleDeviceSelect(device)}
              >
                <div className="device-status">
                  <span className={`status ${device.active_status ? 'active' : 'inactive'}`} />
                  <span>{device.device_label}</span>
                </div>
              </div>
            ))}
          </div>
          {devices.length > 3 && (
            <button className="scroll-button" onClick={() => scroll("right")}>→</button>
          )}
        </div>
      </div>
      
      <div className="navbar-right">
        <button className="menu-button" onClick={handleDrawerToggle}>☰</button>
        <button className="notification-button" onClick={handleNotificationClick}>
          <span className="notification-badge">{unreadAlertsCount + unreadMessagesCount}</span>🔔
        </button>
        <button className="profile-button" onClick={() => handleNavigation("/manager")}>
          <img 
            className="profile-avatar" 
            src={user?.profile_picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
            alt="Profile"
          />
        </button>
      </div>
      
      {isNotificationBoxOpen && (
        <div className="notification-box">
          {/* List of Notifications could go here */}
           <NotificationBox
             anchorEl={notificationAnchorEl}
             open={isNotificationBoxOpen}
             onClose={handleNotificationBoxClose}
           />
        </div>
      )}

      {mobileOpen && (
        <div className="sidebar">
          <SideBar3 open={mobileOpen} handleDrawerToggle={handleDrawerToggle} 
            style={{
              position: "relative",
              zIndex: "auto",
              width: "240px", // Drawer width for desktop
              height: "100vh",
            }}/>
        </div>
      )}
      
    </div>
      <style jsx>{`
        .navbar {
          width: 100%;
          background-color: #222;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          padding: 0 15px;
        }

        /* Navbar Center - Device List */
        .devices-container {
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .devices-list {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Hide scrollbar for Firefox */
        }

        .devices-list::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome, Safari, and Edge */
        }

        .device-item {
          padding: 10px;
          background-color: #333;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 100px;
          transition: transform 0.2s, background-color 0.2s;
        }

        .device-item:hover {
          transform: scale(1.1);
          background-color: #444;
        }

        .device-item.selected {
          background-color: #555;
        }

        .device-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .status {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-bottom: 5px;
        }

        .status.active {
          background-color: #4caf50;
        }

        .status.inactive {
          background-color: #f44336;
        }

        /* Scroll Buttons */
        .scroll-button {
          background-color: #444;
          color: #fff;
          border: none;
          border-radius: 50%;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .scroll-button:hover {
          background-color: #555;
        }

        /* Navbar Right */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .menu-button {
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
        }

        .notification-button {
          position: relative;
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #f44336;
          color: #fff;
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 50%;
        }

        .profile-button {
          background: none;
          border: none;
          cursor: pointer;
        }

        .profile-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        /* Notification Box */
        .notification-box {
          position: absolute;
          top: 60px;
          right: 15px;
          background-color: #333;
          color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          width: 300px;
          max-height: 400px;
          overflow-y: auto;
          z-index: 1001;
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          background-color: #333;
          color: #fff;
          width: 240px;
          height: 100vh;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .devices-container {
            gap: 5px;
          }

          .device-item {
            min-width: 80px;
            padding: 8px;
          }

          .notification-box {
            width: 90%;
            right: 5%;
          }

          .navbar-container {
            flex-direction: column;
          }
        }
      `}</style>

    </div>
  );
}
// #endregion

