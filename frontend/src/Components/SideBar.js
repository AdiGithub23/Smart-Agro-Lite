// #region Original Code
// import React from "react"; //superadmin
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   useMediaQuery,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import GroupsIcon from "@mui/icons-material/Groups";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// const drawerWidth = 240;

// export default function SideBar({ open, handleDrawerToggle }) {
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
//     <Drawer
//       variant={isMobile ? "temporary" : "permanent"}
//       open={isMobile ? open : true}
//       onClose={handleDrawerToggle}
//       sx={{
//         width: isMobile ? "80px" : isTablet ? "150px" : drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: isMobile ? "80px" : isTablet ? "150px" : drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: "#A4D0AE",
//           color: "white",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           overflow: "auto",
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//           paddingBottom: 5,
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//           }}
//         >
//           <Link to="/">
//             <img
//               src="/Images/logo.png"
//               alt="Logo"
//               style={{
//                 height: isMobile ? 40 : isTablet ? 60 : 90,
//                 marginBottom: 10,
//                 marginTop: isMobile ? 20 : 35,
//               }}
//             />
//           </Link>
//         </Toolbar>

//         <List sx={{ flexGrow: 1 }}>
//           <ListItem
//             button
//             component={Link}
//             to="/superadmin"
//             sx={{
//               "&:hover": {
//                 backgroundColor: "#61B44A",
//               },
//               backgroundColor:
//                 location.pathname === "/superadmin" ? "#61B44A" : "transparent",
//               borderRadius: "20px",
//               justifyContent: isMobile ? "center" : "flex-start",
//               marginTop: isMobile ? "20px" : "4px",
//               "& .MuiListItemIcon-root": {
//                 minWidth: isMobile ? 0 : 56,
//               },
//             }}
//           >
//             <ListItemIcon>
//               <AccountCircle
//                 sx={{
//                   color: "black",
//                   fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                 }}
//               />
//             </ListItemIcon>
//             {!isMobile && (
//               <ListItemText primary="Profile" sx={{ color: "black" }} />
//             )}
//           </ListItem>
//           <br />

//           <ListItem
//             button
//             component={Link}
//             to="/superadminuser"
//             sx={{
//               "&:hover": {
//                 backgroundColor: "#61B44A",
//               },
//               backgroundColor:
//                 location.pathname === "/superadminuser"
//                   ? "#61B44A"
//                   : "transparent",
//               borderRadius: "20px",
//               justifyContent: isMobile ? "center" : "flex-start",
//               marginTop: isMobile ? "20px" : "4px",
//               "& .MuiListItemIcon-root": {
//                 minWidth: isMobile ? 0 : 56,
//               },
//             }}
//           >
//             <ListItemIcon>
//               <GroupsIcon
//                 sx={{
//                   color: "black",
//                   fontSize: isMobile ? 24 : isTablet ? 28 : 24,
//                 }}
//               />
//             </ListItemIcon>
//             {!isMobile && (
//               <ListItemText primary="Users" sx={{ color: "black" }} />
//             )}
//           </ListItem>
//           <ListItem
//             button
//             onClick={handleLogout}
//             sx={{
//               "&:hover": {
//                 backgroundColor: "#61B44A",
//               },
//               borderRadius: "20px",
//               justifyContent: isMobile ? "center" : "flex-start",
//               marginTop: isMobile ? "20px" : "4px",
//               "& .MuiListItemIcon-root": {
//                 minWidth: isMobile ? 0 : 56,
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: "black" }}>
//               <LogoutIcon
//                 sx={{ fontSize: isMobile ? 24 : isTablet ? 28 : 24 }}
//               />
//             </ListItemIcon>
//             {!isMobile && (
//               <ListItemText primary="Log Out" sx={{ color: "black" }} />
//             )}
//           </ListItem>
//         </List>
//       </Box>
//     </Drawer>
//   );
// }
// #endregion


import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function SideBar({ open, handleDrawerToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SideBar1 Triggered")
    console.log("Open:", open)
    console.log("handleDrawerToggle:", handleDrawerToggle)
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
            color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
            transform: translateX(-100%);
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
            max-width: 100px;
          }
          .sidebar-menu {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .sidebar-item {
            margin: 0;
          }
          .sidebar-link {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            text-decoration: none;
            color: #fff;
            font-size: 16px;
            transition: background 0.2s;
            width: 100%;
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
            }
          }
        `}
      </style>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/">
            <img
              src="/Images/logo.png"
              alt="Logo"
              className="sidebar-logo"
            />
          </Link>
        </div>

        <ul className="sidebar-menu">
          <li className={`sidebar-item ${location.pathname === "/superadmin" ? "active" : ""}`}>
            <Link to="/superadmin" className="sidebar-link">
              <span className="icon">👤</span>
              <span className="text">Profile</span>
            </Link>
          </li>
          <li className={`sidebar-item ${location.pathname === "/superadminuser" ? "active" : ""}`}>
            <Link to="/superadminuser" className="sidebar-link">
              <span className="icon">👥</span>
              <span className="text">Users</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <button className="sidebar-link" onClick={handleLogout}>
              <span className="icon">🔒</span>
              <span className="text">Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}