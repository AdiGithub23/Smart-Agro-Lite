// #region Original Code
// import React, { useState, useRef, useEffect } from "react"; // customer admin
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationBox from "./NotificationBox";
// import SideBar2 from "./SideBar2";
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
//       [direction === "left" ? "left" : "right"]: 10, // Adjust the distance from the edges
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
// export default function NavBar7() {
//   const [devices, setDevices] = useState([]);
//   const [selectedDeviceId, setSelectedDeviceId] = useState(null);
//   const theme = useTheme();
//   const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const token = localStorage.getItem("token");
//   const decodedToken = jwtDecode(token);
//   const customer_id = decodedToken.id;
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
//       }
//     };
//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const response = await axios.get(
//           ` /api/device/customer-admin/${customer_id}`
//         );
//         setDevices(response.data);

//         if (!localStorage.getItem("DeviceID") && response.data.length > 0) {
//           const firstDeviceId = response.data[0].id.toString();
//           const firstDeviceName = response.data[0].model_name;
//           localStorage.setItem("DeviceID", firstDeviceId);
//           localStorage.setItem("DeviceName", firstDeviceName);
//           setSelectedDeviceId(firstDeviceId);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchDevices();
//   }, [customer_id]);

//   useEffect(() => {
//     const savedDeviceId = localStorage.getItem("DeviceID");
//     setSelectedDeviceId(savedDeviceId);
//   }, []);

//   useEffect(() => {
//     const fetchUnreadAlertCount = async () => {
//       try {
//         const response = await axios.get(
//           `/api/notifications/alerts/count/${customer_id}`
//         );

//         if (response.data.success) {
//           setUnreadAlertsCount(response.data.unreadCount);
//         } else {
//           console.error(
//             "Failed to fetch unread notifications count: ",
//             response.data.message
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching unread notifications count:", error);
//       }
//     };

//     fetchUnreadAlertCount();

//     const fetchUnreadMessageCount = async () => {
//       try {
//         const response = await axios.get(
//           `/api/notifications/messages/count/${customer_id}`
//         );

//         if (response.data.success) {
//           setUnreadMessagesCount(response.data.unreadCount);
//         } else {
//           console.error(
//             "Failed to fetch unread notifications count: ",
//             response.data.message
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching unread notifications count:", error);
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
//   }, [customer_id]);

//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTabletScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
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
//     localStorage.setItem("DeviceName", device.model_name);
//     setSelectedDeviceId(device.id.toString());
//     window.location.reload();
//   };

//   const scroll = (direction) => {
//     if (containerRef.current) {
//       const container = containerRef.current;
//       let scrollAmount;

//       if (isSmallScreen) {
//         scrollAmount = container.clientWidth; // Show one item
//       } else if (isTabletScreen) {
//         scrollAmount = container.clientWidth / 3; // Show three items
//       } else {
//         scrollAmount = 300; // Adjust this value based on item width and spacing for desktop
//       }

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
//         sx={{ backgroundColor:"rgba(143, 186, 166, 1)",boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",color: "#000", zIndex: 1100 }}
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
//                 xs: "calc(93% - 75px)",
//                 sm: "calc(93% - 180px)",
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
//               <Badge
//                 badgeContent={unreadAlertsCount + unreadMessagesCount}
//                 color="error"
//               >
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={() => handleNavigation("/customeradmin")}
//               color="inherit"
//             >
//               <Avatar
//                 src={
//                   user?.profile_picture
//                     ? user.profile_picture
//                     : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                 }
//                 alt="Profile"
//                 style={{
//                   width: 30,
//                   height: 30,
//                   borderRadius: "50%",
//                 }}
//               />{" "}
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMenu}
//       <SideBar2 open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
//       <NotificationBox
//         anchorEl={notificationAnchorEl}
//         open={isNotificationBoxOpen}
//         onClose={handleNotificationBoxClose}
//       />
//          
//     </Box>
//   );
// }
// #endregion


// Customer-Admin

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import NotificationBox from "./NotificationBox"; 
import SideBar2 from "./SideBar2"; 

const styles = {
  navbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: '#333',
    color: '#fff',
    zIndex: 1000,
    padding: '10px 20px',
  },
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuicon: {
    // cursor: 'pointer',
    color: 'white',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  deviceList: {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  deviceItem: {
    padding: '10px',
    backgroundColor: '#8fbaa6',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  deviceItemSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  notificationIcon: {
    position: 'relative',
    cursor: 'pointer',
  },
  profileIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '15px',
  },
};

export default function NavBar7() {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const customer_id = decodedToken.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${customer_id}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [customer_id]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`/api/device/customer-admin/${customer_id}`);
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
  }, [customer_id]);

  useEffect(() => {
    const fetchUnreadAlertCount = async () => {
      try {
        const response = await axios.get(`/api/notifications/alerts/count/${customer_id}`);
        if (response.data.success) {
          setUnreadAlertsCount(response.data.unreadCount);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUnreadMessageCount = async () => {
      try {
        const response = await axios.get(`/api/notifications/messages/count/${customer_id}`);
        if (response.data.success) {
          setUnreadMessagesCount(response.data.unreadCount);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnreadAlertCount();
    fetchUnreadMessageCount();

    const intervalId1 = setInterval(fetchUnreadMessageCount, 60000);
    const intervalId2 = setInterval(fetchUnreadAlertCount, 60000);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, [customer_id]);

  const handleDeviceSelect = (device) => {
    localStorage.setItem("DeviceID", device.id.toString());
    setSelectedDeviceId(device.id.toString());
    window.location.reload();
  };

  const handleNotificationClick = () => {
    setIsNotificationBoxOpen(!isNotificationBoxOpen);
  };

  const handleProfileClick = () => {
    navigate("/customeradmin");
  };

  const scroll = (direction) => {
    // Simple scrolling logic for devices list
    const container = document.getElementById('device-list-container');
    const scrollAmount = container.clientWidth / 3;
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationBoxClose = () => {
    setNotificationAnchorEl(null);
    setIsNotificationBoxOpen(false);
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navbarContainer}>
        <div style={styles.logoContainer}>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={styles.iconButton}>
            <span>☰</span>
          </button>
          {/* <div className="menuicon" onClick={handleDrawerToggle}>
            <span>&#9776;</span> 
          </div> */}

          <div style={styles.deviceList} id="device-list-container">
            <button
              onClick={() => scroll("left")}
              style={styles.iconButton}
            >
              ‹
            </button>
            {devices.map((device) => (
              <div
                key={device.id}
                style={{
                  ...styles.deviceItem,
                  ...(selectedDeviceId === device.id.toString() ? styles.deviceItemSelected : {}),
                }}
                onClick={() => handleDeviceSelect(device)}
              >
                {device.device_label}
              </div>
            ))}
            <button
              onClick={() => scroll("right")}
              style={styles.iconButton}
            >
              ›
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={handleNotificationClick}
            style={styles.iconButton}
          >
            <span style={styles.notificationIcon}>🔔{unreadAlertsCount + unreadMessagesCount}</span>
          </button>
          <img src={user?.profile_picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Profile"
            style={styles.profileIcon}
            onClick={handleProfileClick}
          />
        </div>
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
          <SideBar2 open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        </div>
      )}


    </div>
  );
}
