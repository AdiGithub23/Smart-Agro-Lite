// #region Original Code
// import React, { useState, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
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
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import NotificationBox from "./NotificationBox";
// import SideBar2 from "./SideBar2";
// import DeviceStatusButton from "./DeviceStatus";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { jwtDecode } from "jwt-decode";

// const ScrollContainer = React.forwardRef(({ children }, ref) => (
//   <Box
//     ref={ref}
//     sx={{
//       display: "flex",
//       overflow: "hidden",
//       width: "100%",
//       padding: 2,
//       position: "relative",
//       margin: "0 20px",
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
// export default function NavBar5() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const location = useLocation();

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
//   const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [selectedDevice, setSelectedDevice] = useState(null); // Track selected device
//   const [admin_id, setUserId] = useState(null);
//   const [unreadAlertsCount, setUnreadAlertsCount] = useState(0);
//   const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

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

//   const handleDeviceClick = (deviceName) => {
//     setSelectedDevice(deviceName); // Update selected device
//     navigate(`/admincustomeralerts/${encodeURIComponent(deviceName)}`);
//   };

//   useEffect(() => {
//     const fetchUnreadAlertCount = async () => {
//       try {
//         const response = await axios.get(`/api/notifications/alerts/count/${admin_id}`);

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
//         const response = await axios.get(`/api/notifications/messages/count/${admin_id}`);

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
    
//   }, [admin_id]);

//   const scroll = (direction) => {
//     if (containerRef.current) {
//       const container = containerRef.current;
//       const scrollAmount = 300;
//       if (direction === "left") {
//         container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//       } else {
//         container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//       }
//     }
//   };

//   const devices = [
//     { status: "green", serialNumber: "S0345", deviceName: "Device - 01" },
//     { status: "yellow", serialNumber: "S0346", deviceName: "Device - 02" },
//     { status: "red", serialNumber: "S0347", deviceName: "Device - 03" },
//     { status: "green", serialNumber: "S0348", deviceName: "Device - 04" },
//     { status: "yellow", serialNumber: "S0349", deviceName: "Device - 05" },
//     { status: "red", serialNumber: "S0350", deviceName: "Device - 06" },
//     { status: "green", serialNumber: "S0351", deviceName: "Device - 07" },
//     { status: "yellow", serialNumber: "S0352", deviceName: "Device - 08" },
//     { status: "red", serialNumber: "S0353", deviceName: "Device - 09" },
//     { status: "green", serialNumber: "S0354", deviceName: "Device - 10" },
//   ];

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={() => handleNavigation("/customeradmin")}>
//         Profile
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar
//         position="fixed"
//         sx={{ backgroundColor: "#C4DAD0", color: "#000", zIndex: 1100 }}
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
//               width: "calc(100% - 300px)", // Adjust width to fit within AppBar
//             }}
//           >
//             <ArrowButton direction="left" onClick={() => scroll("left")} />
//             <ScrollContainer ref={containerRef}>
//               {devices.map((device, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     padding: 2,
//                     margin: "0 10px",
//                     borderRadius: "10px",
//                     background: "rgba(255, 255, 255, 0.2)",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     backdropFilter: "blur(10px)",
//                     minWidth: "200px",
//                     textAlign: "center",
//                     flexShrink: 0,
//                   }}
//                 >
//                   <DeviceStatusButton
//                     status={device.status}
//                     serialNumber={device.serialNumber}
//                     deviceName={device.deviceName}
//                     onClick={() => handleDeviceClick(device.deviceName)}
//                     sx={{
//                       "&:hover": {
//                         backgroundColor: "#61B44A",
//                       },
//                       backgroundColor:
//                         selectedDevice === device.deviceName
//                           ? "#61B44A"
//                           : "transparent", // Conditional styling
//                     }}
//                   />
//                 </Box>
//               ))}
//             </ScrollContainer>
//             <ArrowButton direction="right" onClick={() => scroll("right")} />
//           </Box>
//           <Box sx={{ display: "flex" }}>
//             <IconButton
//               size="large"
//               aria-label="show new notifications count"
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
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle />
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
//     </Box>
//   );
// }
//#endregion





import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ScrollContainer = React.forwardRef(({ children }, ref) => (
  <div ref={ref} className="scroll-container">{children}</div>
));

const ArrowButton = ({ direction, onClick }) => (
  <button onClick={onClick} className={`arrow-button ${direction}`}>
    {direction === "left" ? "<" : ">"}
  </button>
);

export default function NavBar1() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const location = useLocation();
  const [unreadAlertsCount, setUnreadAlertsCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(null); 
  const [admin_id, setAdminId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  useEffect(() => {
    const fetchUserId = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setAdminId(decodedToken.id);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUnreadAlertCount = async () => {
      try {
        const response = await fetch(`/api/notifications/alerts/count/${admin_id}`);
        const data = await response.json();
        if (data.success) {
          setUnreadAlertsCount(data.unreadCount);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUnreadMessageCount = async () => {
      try {
        const response = await fetch(`/api/notifications/messages/count/${admin_id}`);
        const data = await response.json();
        if (data.success) {
          setUnreadMessagesCount(data.unreadCount);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (admin_id) {
      fetchUnreadAlertCount();
      fetchUnreadMessageCount();
    }

    const intervalId1 = setInterval(fetchUnreadMessageCount, 60000);
    const intervalId2 = setInterval(fetchUnreadAlertCount, 60000);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
    };
  }, [admin_id]);

  const devices = [
    { status: "green", serialNumber: "S0345", deviceName: "Device - 01" },
    { status: "yellow", serialNumber: "S0346", deviceName: "Device - 02" },
    { status: "red", serialNumber: "S0347", deviceName: "Device - 03" },
    { status: "green", serialNumber: "S0348", deviceName: "Device - 04" },
    { status: "yellow", serialNumber: "S0349", deviceName: "Device - 05" },
    { status: "red", serialNumber: "S0350", deviceName: "Device - 06" },
    { status: "green", serialNumber: "S0351", deviceName: "Device - 07" },
    { status: "yellow", serialNumber: "S0352", deviceName: "Device - 08" },
    { status: "red", serialNumber: "S0353", deviceName: "Device - 09" },
    { status: "green", serialNumber: "S0354", deviceName: "Device - 10" },
  ];

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleDeviceClick = (deviceName) => {
    setSelectedDevice(deviceName);
    navigate(`/admincustomeralerts/${encodeURIComponent(deviceName)}`);
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="menu-button" onClick={() => setMobileOpen(!mobileOpen)}>
          &#9776; {/* Hamburger icon */}
        </div>
        <div className="device-scroll">
          <ArrowButton direction="left" onClick={() => scroll("left")} />
          <ScrollContainer ref={containerRef}>
            {devices.map((device, index) => (
              <div key={index} className="device-status" onClick={() => handleDeviceClick(device.deviceName)}>
                <div className={`status ${device.status}`}></div>
                <span>{device.deviceName}</span>
              </div>
            ))}
          </ScrollContainer>
          <ArrowButton direction="right" onClick={() => scroll("right")} />
        </div>
        <div className="notification-profile">
          <button className="notification-button" onClick={() => setIsNotificationBoxOpen(!isNotificationBoxOpen)}>
            <span className="badge">{unreadAlertsCount + unreadMessagesCount}</span>🔔
          </button>
          <button className="profile-button">
            <span>👤</span>
          </button>
        </div>
      </div>
      {isNotificationBoxOpen && (
        <div className="notification-box">
          <div className="notification-item">Alert 1</div>
          <div className="notification-item">Message 2</div>
        </div>
      )}
      {mobileOpen && <div className="sidebar">Sidebar content here</div>}

      <style jsx>
        {`
          .navbar {
            position: fixed;
            width: 100%;
            background-color: #333;
            padding: 10px;
            color: white;
            z-index: 1000;
          }
          
          .navbar-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .menu-button {
            font-size: 30px;
            cursor: pointer;
          }
          
          .device-scroll {
            display: flex;
            align-items: center;
          }
          
          .arrow-button {
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            margin: 0 10px;
          }
          
          .arrow-button.left {
            transform: rotate(180deg);
          }
          
          .scroll-container {
            display: flex;
            overflow-x: auto;
            padding: 10px;
          }
          
          .device-status {
            margin-right: 20px;
            text-align: center;
            cursor: pointer;
          }
          
          .device-status .status {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-bottom: 5px;
          }
          
          .device-status .status.green {
            background-color: green;
          }
          
          .device-status .status.yellow {
            background-color: yellow;
          }
          
          .device-status .status.red {
            background-color: red;
          }
          
          .notification-profile {
            display: flex;
            align-items: center;
          }
          
          .notification-button,
          .profile-button {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            margin: 0 10px;
            cursor: pointer;
          }
          
          .badge {
            background-color: red;
            border-radius: 50%;
            padding: 5px 10px;
            font-size: 14px;
            position: absolute;
            top: -5px;
            right: -10px;
          }
          
          .notification-box {
            position: absolute;
            top: 60px;
            right: 10px;
            background-color: white;
            color: black;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .notification-item {
            padding: 5px;
            margin: 5px 0;
          }
          
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            height: 100%;
            background-color: #222;
            color: white;
            padding: 20px;
          }
          
        `}
      </style>
    </div>
  );
}
