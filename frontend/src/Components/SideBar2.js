// #region Original Code
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   IconButton,
//   useMediaQuery,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import GroupsIcon from "@mui/icons-material/Groups";
// import BuildIcon from "@mui/icons-material/Build";
// // import MessageIcon from "@mui/icons-material/Message";
// import HistoryIcon from "@mui/icons-material/History";
// import AgricultureIcon from "@mui/icons-material/Agriculture";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SpaIcon from "@mui/icons-material/Spa";
// import { useTheme } from "@mui/material/styles";
// import LogoutIcon from "@mui/icons-material/Logout";
// const drawerWidth = 240;

// export default function SideBar2({ open, handleDrawerToggle }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:1200px)");
//   const isDesktop = !isMobile && !isTablet;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [settings, setSettings] = useState(null);
//   const deviceID = localStorage.getItem("DeviceID");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   useEffect(() => {
//     const fetchSettings = async () => {
//       if (!deviceID) {
//         console.warn('No Device ID');
//         setSettings({});
//         return;  
//       }
//       try {
//         const response = await fetch(`/api/settings?device_id=${deviceID}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setSettings(data);
//       } catch (error) {
//         console.error('Error fetching dashboard settings:', error);
//         setSettings({});
//       }
//     };
//     fetchSettings();
//   }, [deviceID]);

//   if (!settings) {
//     return null;
//   }

//   return (
//     <>
//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={isMobile ? open : true}
//         onClose={handleDrawerToggle}
//         sx={{
//           width: isMobile ? "80px" : isTablet ? "170px" : drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: isMobile ? "80px" : isTablet ? "170px" : drawerWidth,
//             boxSizing: "border-box",
//             backgroundColor: "#A4D0AE",
//             color: "white",
//           },
//         }}
//       >
//         <Box sx={{ overflow: "auto" }}>
//           <Toolbar
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "column",
//             }}
//           >
//             <Link to="/">
//               <img
//                 src="/Images/logo.png"
//                 alt="Logo"
//                 style={{
//                   height: isMobile ? 40 : isTablet ? 60 : 55,
//                   marginBottom: 6,
//                   marginTop: isMobile ? 20 : 25,
//                 }}
//               />
//             </Link>
//           </Toolbar>

//           <List>
//             <ListItem
//               button
//               component={Link}
//               to="/admincoustomerdashboard"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/admincoustomerdashboard"
//                     ? "#61B44A"
//                     : "transparent",
//                 borderRadius: "20px",
//                 justifyContent: isMobile ? "center" : "flex-start",
//                 marginTop: isMobile ? "20px" : "2px",
//                 "& .MuiListItemIcon-root": {
//                   minWidth: isMobile ? 0 : 56,
//                 },
//               }}
//             >
//               <ListItemIcon>
//                 <DashboardIcon
//                   sx={{
//                     color: "black",
//                     fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                   }}
//                 />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText primary="Dashboard" sx={{ color: "black" }} />
//               )}
//             </ListItem>

//             {settings.real_time && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admincustomerrealtime"
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "#61B44A",
//                   },
//                   backgroundColor:
//                     location.pathname === "/admincustomerrealtime"
//                       ? "#61B44A"
//                       : "transparent",
//                   borderRadius: "20px",
//                   justifyContent: isMobile ? "center" : "flex-start",
//                   marginTop: isMobile ? "20px" : "4px",
//                   "& .MuiListItemIcon-root": {
//                     minWidth: isMobile ? 0 : 56,
//                   },
//                 }}
//               >
//                 <ListItemIcon>
//                   <HistoryIcon
//                     sx={{
//                       color: "black",
//                       fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                     }}
//                   />
//                 </ListItemIcon>
//                 {!isMobile && (
//                   <ListItemText primary="Real Time" sx={{ color: "black" }} />
//                 )}
//               </ListItem>
//             )}

//             {settings.alerts && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admincustomeralerts"
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "#61B44A",
//                   },
//                   backgroundColor:
//                     location.pathname === "/admincustomeralerts"
//                       ? "#61B44A"
//                       : "transparent",
//                   borderRadius: "20px",
//                   justifyContent: isMobile ? "center" : "flex-start",
//                   marginTop: isMobile ? "20px" : "4px",
//                   "& .MuiListItemIcon-root": {
//                     minWidth: isMobile ? 0 : 56,
//                   },
//                 }}
//               >
//                 <ListItemIcon>
//                   <NotificationsIcon
//                     sx={{
//                       color: "black",
//                       fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                     }}
//                   />
//                 </ListItemIcon>
//                 {!isMobile && (
//                   <ListItemText primary="Alerts" sx={{ color: "black" }} />
//                 )}
//               </ListItem>
//             )}

//             {settings.analysis && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/admincoustomeranalysis"
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "#61B44A",
//                   },
//                   backgroundColor:
//                     location.pathname === "/admincoustomeranalysis"
//                       ? "#61B44A"
//                       : "transparent",
//                   borderRadius: "20px",
//                   justifyContent: isMobile ? "center" : "flex-start",
//                   marginTop: isMobile ? "20px" : "4px",
//                   "& .MuiListItemIcon-root": {
//                     minWidth: isMobile ? 0 : 56,
//                   },
//                 }}
//               >
//                 <ListItemIcon>
//                   <AssignmentTurnedInIcon
//                     sx={{
//                       color: "black",
//                       fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                     }}
//                   />
//                 </ListItemIcon>
//                 {!isMobile && (
//                   <ListItemText primary="Analysis" sx={{ color: "black" }} />
//                 )}
//               </ListItem>
//             )}
//             {settings.yield && (
//               <ListItem
//                 button
//                 component={Link}
//                 to="/customeradminyield"
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "#61B44A",
//                   },
//                   backgroundColor:
//                     location.pathname === "/customeradminyield"
//                       ? "#61B44A"
//                       : "transparent",
//                   borderRadius: "20px",
//                   justifyContent: isMobile ? "center" : "flex-start",
//                   marginTop: isMobile ? "20px" : "4px",
//                   "& .MuiListItemIcon-root": {
//                     minWidth: isMobile ? 0 : 56,
//                   },
//                 }}
//               >
//                 <ListItemIcon>
//                   <SpaIcon
//                     sx={{
//                       color: "black",
//                       fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                     }}
//                   />
//                 </ListItemIcon>
//                 {!isMobile && (
//                   <ListItemText primary="Yield" sx={{ color: "black" }} />
//                 )}
//               </ListItem>
//             )}
            
//             <ListItem
//               button
//               component={Link}
//               to="/customeradminuser"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/customeradminuser"
//                     ? "#61B44A"
//                     : "transparent",
//                 borderRadius: "20px",
//                 justifyContent: isMobile ? "center" : "flex-start",
//                 marginTop: isMobile ? "20px" : "4px",
//                 "& .MuiListItemIcon-root": {
//                   minWidth: isMobile ? 0 : 56,
//                 },
//               }}
//             >
//               <ListItemIcon>
//                 <GroupsIcon
//                   sx={{
//                     color: "black",
//                     fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                   }}
//                 />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText primary="Users" sx={{ color: "black" }} />
//               )}
//             </ListItem>

//             <ListItem
//               button
//               component={Link}
//               to="/customeradminfarms"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/customeradminfarms"
//                     ? "#61B44A"
//                     : "transparent",
//                 borderRadius: "20px",
//                 justifyContent: isMobile ? "center" : "flex-start",
//                 marginTop: isMobile ? "20px" : "4px",
//                 "& .MuiListItemIcon-root": {
//                   minWidth: isMobile ? 0 : 56,
//                 },
//               }}
//             >
//               <ListItemIcon>
//                 <AgricultureIcon
//                   sx={{
//                     color: "black",
//                     fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                   }}
//                 />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText primary="Farms" sx={{ color: "black" }} />
//               )}
//             </ListItem>

//             <ListItem
//               button
//               component={Link}
//               to="/admincustomerdevices"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/admincustomerdevices"
//                     ? "#61B44A"
//                     : "transparent",
//                 borderRadius: "20px",
//                 justifyContent: isMobile ? "center" : "flex-start",
//                 marginTop: isMobile ? "20px" : "4px",
//                 "& .MuiListItemIcon-root": {
//                   minWidth: isMobile ? 0 : 56,
//                 },
//               }}
//             >
//               <ListItemIcon>
//                 <BuildIcon sx={{ color: "black" }} />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText
//                   primary="Devices"
//                   sx={{
//                     fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                     color: "black",
//                   }}
//                 />
//               )}
//             </ListItem>

//             <ListItem
//               button
//               onClick={handleLogout}
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 borderRadius: "20px",
//                 justifyContent: isMobile ? "center" : "flex-start",
//                 marginTop: isMobile ? "40px" : "1px",
//                 "& .MuiListItemIcon-root": {
//                   minWidth: isMobile ? 0 : 56,
//                 },
               
//               }}
//             >
//               <ListItemIcon sx={{ color: "black" }}>
//                 <LogoutIcon
//                   sx={{ fontSize: isMobile ? 24 : isTablet ? 28 : 24 }}
//                 />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText primary="Log Out" sx={{ color: "black" }} />
//               )}
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// }
// #endregion


import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SideBar2({ open, handleDrawerToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const deviceID = localStorage.getItem("DeviceID");
  const isMobile = window.innerWidth <= 600;
  const isTablet = window.innerWidth > 600 && window.innerWidth <= 1200;
  const drawerStyle = isMobile ? (open ? "drawer open" : "drawer") : "drawer open";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const fetchSettings = async () => {
      if (!deviceID) {
        console.warn("No Device ID");
        setSettings({});
        return;
      }
      try {
        const response = await fetch(`/api/settings?device_id=${deviceID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error(error);
        setSettings({});
      }
    };
    fetchSettings();
  }, [deviceID]);

  if (!settings) {
    return null;
  }


  return (
    <>
      <style>
        {`
          .drawer {
            position: fixed;
            left: 0;
            top: 0;
            width: 240px;
            height: 100%;
            background: #2c3e50;
            color: white;
            overflow-y: auto;
            transition: transform 0.3s ease-in-out;
            transform: translateX(-100%);
          }
          .drawer.open {
            transform: translateX(0);
          }
          .toolbar {
            padding: 20px;
            text-align: center;
          }
          .toolbar img {
            max-height: 90px;
          }
          .list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .list-item {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            cursor: pointer;
            text-decoration: none;
            color: white;
            transition: background 0.2s;
          }
          .list-item:hover {
            background: #34495e;
          }
          .list-item-icon {
            margin-right: 10px;
          }
          .list-item-text {
            display: ${isMobile ? "none" : "block"};
          }
          .logout {
            margin-top: auto;
          }
        `}
      </style>
      <div className={drawerStyle}>
        <div className="toolbar">
          <Link to="/">
            <img src="/Images/logo.png" alt="Logo" />
          </Link>
        </div>

        <ul className="list">
          <li>
            <Link to="/customeradmin" className="list-item">
              <span className="list-item-icon">🏠</span>
              <span className="list-item-text">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/customeradminuser" className="list-item">
              <span className="list-item-icon">👥</span>
              <span className="list-item-text">Users</span>
            </Link>
          </li>

          <li className="list-item logout" onClick={handleLogout}>
            <span className="list-item-icon">🚪</span>
            <span className="list-item-text">Log Out</span>
          </li>
        </ul>
      </div>
    </>
  );
}
