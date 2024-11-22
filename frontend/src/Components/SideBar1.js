// #region Original Code
// import React from "react";
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
// import { useTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import GroupsIcon from "@mui/icons-material/Groups";
// import BuildIcon from "@mui/icons-material/Build";
// // import MessageIcon from "@mui/icons-material/Message";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ConstructionIcon from "@mui/icons-material/Construction";
// import RssFeedIcon from "@mui/icons-material/RssFeed";
// // import TravelExploreIcon from '@mui/icons-material/TravelExplore';

// const drawerWidth = 240;

// export default function SideBar1({ open, handleDrawerToggle }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:1200px)");
//   const isDesktop = !isMobile && !isTablet;
//   const location = useLocation();

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

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
//                   height: isMobile ? 40 : isTablet ? 60 : 90,
//                   marginBottom: 10,
//                   marginTop: isMobile ? 20 : 35,
//                 }}
//               />
//             </Link>
//           </Toolbar>

//           <List>
//             <ListItem
//               button
//               component={Link}
//               to="/adminsltdashboard"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/adminsltdashboard"
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

//             <ListItem
//               button
//               component={Link}
//               to="/adminsltuser"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/adminsltuser"
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
//               to="/adminsltinventry"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/adminsltinventry"
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
//                 <ConstructionIcon
//                   sx={{
//                     color: "black",
//                     fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                   }}
//                 />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText primary="Inventory" sx={{ color: "black" }} />
//               )}
//             </ListItem>

//             <ListItem
//               button
//               component={Link}
//               to="/adminsltdevices"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/adminsltdevices"
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
//                 <BuildIcon
//                   sx={{
//                     color: "black",
//                     fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                   }}
//                 />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText primary="Devices" sx={{ color: "black" }} />
//               )}
//             </ListItem>

//             <ListItem
//               button
//               component={Link}
//               to="/adminsltpackage"
//               sx={{
//                 "&:hover": {
//                   backgroundColor: "#61B44A",
//                 },
//                 backgroundColor:
//                   location.pathname === "/adminsltpackage"
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
//                 <RssFeedIcon
//                   sx={{
//                     color: "black",
//                     fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                   }}
//                 />
//               </ListItemIcon>
//               {!isMobile && (
//                 <ListItemText primary="Packages" sx={{ color: "black" }} />
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
//                 marginTop: isMobile ? "20px" : "4px",
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


import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SideBar1({ open, handleDrawerToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SideBar1 Triggered")
    console.log("Open:", open)
    // console.log("handleDrawerToggle:", handleDrawerToggle)
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          .sidebar {
            width: 240px;
            height: 100vh;
            background-color: #1e1e2f;
            color: white;
            position: fixed;
            top: 0;
            left: 0;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
            z-index: 1000;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .sidebar-header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #333;
          }
          .sidebar-logo {
            max-width: 100%;
            height: auto;
          }
          .sidebar-menu {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          .sidebar-item {
            margin: 0;
            padding: 10px 20px;
          }
          .sidebar-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: white;
            font-size: 16px;
            padding: 10px 15px;
            transition: background-color 0.2s;
            cursor: pointer;
          }
          .sidebar-link:hover {
            background-color: #333;
          }
          .sidebar-link .icon {
            margin-right: 10px;
          }
          .sidebar-item.active .sidebar-link {
            background-color: #444;
          }
          @media (max-width: 600px) {
            .sidebar {
              width: 100%;
              transform: translateX(-100%);
            }
            .sidebar.open {
              transform: translateX(0);
              width: 100%;
            }
          }
        `}
      </style>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/">
            <img src="/Images/logo.png" alt="Logo" className="sidebar-logo" />
          </Link>
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Link to="/adminsltdashboard" className="sidebar-link">
              <span className="icon">📊</span>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/adminsltuser" className="sidebar-link">
              <span className="icon">👥</span>
              <span className="text">Users</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/adminsltinventry" className="sidebar-link">
              <span className="icon">🛠️</span>
              <span className="text">Inventory</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/adminsltdevices" className="sidebar-link">
              <span className="icon">⚙️</span>
              <span className="text">Devices</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/adminsltpackage" className="sidebar-link">
              <span className="icon">📦</span>
              <span className="text">Packages</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <div className="sidebar-link" onClick={handleLogout}>
              <span className="icon">🔒</span>
              <span className="text">Log Out</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

