// #region Original Code
// import React, { useState, useEffect } from "react"; // superadmin
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
// import NotificationBox from "./NotificationBox"; // Import the NotificationBox component
// import SideBar from "./SideBar"; // Import the SideBar component
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { Avatar } from "@mui/material";
// export default function NavBar() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();

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

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar
//         position="fixed"
//         sx={{ backgroundColor: "rgba(143, 186, 166, 1)", color: "#000", zIndex: 1100 }}
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
//           <Box sx={{ display: "flex" }}>
           
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={() => handleNavigation("/superadmin")}
//               color="inherit"
//             >
//               <Avatar
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
//       <SideBar open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
//       <NotificationBox
//         anchorEl={notificationAnchorEl}
//         open={isNotificationBoxOpen}
//         onClose={handleNotificationBoxClose}
//       />
//     </Box>
//   );
// }
// #endregion


// Super-Admin

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NotificationBox from "./NotificationBox";
import SideBar from "./SideBar";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNotificationBoxOpen, setIsNotificationBoxOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  
  
  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  // Handle navigation
  const handleNavigation = (page) => {
    navigate(page);
  };

  // Handle notification box toggle
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    setIsNotificationBoxOpen(!isNotificationBoxOpen);
  };
  const handleNotificationBoxClose = () => {
    setNotificationAnchorEl(null);
    setIsNotificationBoxOpen(false);
  };

  // Toggle mobile menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    console.log("handleDrawerToggle triggered:", mobileOpen)
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        {/* Mobile menu toggle */}
        <button className="menu-toggle" onClick={handleDrawerToggle}>
          <span>&#9776;</span> 
        </button>

        <div className="navbar-actions">
          {/* Profile Avatar */}
          <button className="profile-avatar" onClick={() => handleNavigation("/superadmin")}>
            <img
              src={user?.profile_picture || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="Profile"
              className="avatar-img"
            />
          </button>

          {/* Notifications */}
          <button className="notification-icon" onClick={handleNotificationClick}>
            <span className="notification-badge">!</span>
          </button>
        </div>
      </div>

      {/* Notification Box */}
      <NotificationBox anchorEl={notificationAnchorEl} open={isNotificationBoxOpen} onClose={handleNotificationBoxClose}/>

      {/* Sidebar for mobile */}
      <SideBar open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Styles for the navbar */}
      <style jsx>{`
        .navbar-container {
          position: relative;
        }

        .navbar {
          background-color: #2b3832;
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          align-items: center;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 30px;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
        }

        .profile-avatar {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .notification-icon {
          background: none;
          border: none;
          padding: 0 10px;
          cursor: pointer;
          position: relative;
        }

        .notification-badge {
          background-color: red;
          color: white;
          border-radius: 50%;
          position: absolute;
          top: -5px;
          right: -5px;
          padding: 5px;
          font-size: 12px;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default NavBar;
