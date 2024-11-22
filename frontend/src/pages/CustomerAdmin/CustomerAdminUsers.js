// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Avatar,
//   Grid,
//   IconButton,
//   Tooltip,
//   Container,
//   Box,
//   Fab,
//   Pagination,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Button,
//   DialogActions,
// } from "@mui/material";
// import { Edit, Add, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
// import NavBar7 from "../../Components/NavBar7";
// import DeleteIcon from "@mui/icons-material/Delete";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import axios from "axios";

// export default function CustomerAdminUser() {
//   const [users, setUsers] = useState([]);
//   const [companyName, setCompanyName] = useState();
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(4);
//   const navigate = useNavigate();
//   const [openDelete, setOpenDelete] = useState(false);
//   const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
//   const [expandedUser, setExpandedUser] = useState(null);
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:1200px)");
//   const isDesktop = !isMobile && !isTablet;
//   const [selectedUserData, setSelectedUserData] = useState({
//     profile_picture: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//     fullName: '',
//     companyName: '',
//     adminId: '',
//     address: '',
//     visibility: true,
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // logged-in user
//         const loggedInUserResponse = await fetch("/api/user/me", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (!loggedInUserResponse.ok) {
//           throw new Error("Failed to fetch logged-in user");
//         }
//         const loggedInUser = await loggedInUserResponse.json();
//         const loggedInUserId = loggedInUser.id;
//         setCompanyName(loggedInUser.company);

//         // customer-manager users
//         const customerManagersResponse = await fetch(
//           "/api/customeradmin/mymanagers",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         if (!customerManagersResponse.ok) {
//           throw new Error("Failed to fetch customer managers");
//         }
//         const customerManagers = await customerManagersResponse.json();

//         // customer-managers based on createdById
//         const filteredCustomerManagers = customerManagers.filter(
//           (user) =>
//             user.user_role === "customer-manager" &&
//             user.createdById === loggedInUserId
//         );
//         setUsers(filteredCustomerManagers);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);
//   useEffect(() => {
//     console.log("selectedItemForDelete:", selectedItemForDelete);
//   }, [selectedItemForDelete]);  
//   useEffect(() => {
//     console.log("selectedUserData:", selectedUserData);
//   }, [selectedUserData]);


//   const handleAdd = () => {
//     navigate("/customeradminadd");
//   };
//   const handleEdit = (userId) => {
//     navigate(`/customeradminedit/${userId}`);
//   };


//   const handleDelete = async (userId) => {
//     setSelectedItemForDelete(userId);
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`/api/user/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const userData = response.data;
//         console.log("userdata fetched: ", userData)
//         // setSelectedUserData(response.data);
//         setSelectedUserData({
//           profile_picture: userData.profile_picture,
//           email: userData.email,
//           phoneNumber: userData.phone_number,
//           password: '', // Ensure password is not set for security reasons
//           fullName: userData.full_name,
//           companyName: userData.company,
//           adminId: userData.id,
//           address: userData.address,
//           visibility: userData.visibility,
//         });        
//         console.log("selectedUserData Values: ", selectedUserData)
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
//     fetchUserData();
//     setOpenDelete(true);
    

//   };
//   const confirmDelete = async () => {
//     console.log(`\nhandleSubmitForm function triggered for ${selectedItemForDelete} !!!`);
//     try {     
//       const formData = new FormData();
//       formData.append("full_name", selectedUserData.fullName);
//       formData.append("address", selectedUserData.address);
//       formData.append("email", selectedUserData.email);
//       formData.append("phone_number", selectedUserData.phoneNumber);
//       formData.append("user_role", "customer-admin");
//       formData.append("company", selectedUserData.companyName);
//       formData.append("profile_picture", selectedUserData.profile_picture);
//       if (selectedUserData.password) {
//         formData.append("password", selectedUserData.password);
//       }
//       if (selectedItemForDelete) {
//         formData.append("visibility", false);
//       }
//       console.log("selectedUserData:", selectedUserData);
//       console.log("formData        :", formData);
//       console.log("Matched Properties");

//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `/api/user/${selectedItemForDelete}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("User disabled successfully:", response.data);
//       handleCloseDelete();
//       alert("The disabled successfully");

//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };
//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };


//   const handleExpand = (userId) => {
//     setExpandedUser(expandedUser === userId ? null : userId);
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const paginatedUsers = users.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );
//   const backgroundStyle = {
//     backgroundColor: "#8FBAA6",
//     padding: "0px 0px 100px 0px",
//     minHeight: "100vh",
//     width: "100%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     zIndex: -1,
//   };


//   return (
//     <div style={backgroundStyle}>
//       <Container
//         component="main"
//         maxWidth={false}
//         sx={{
//           width: { xs: "100%", sm: "90%" },
//           height: "auto",
//           display: "flex",
//           flexDirection: "column",
//           marginRight: "2px",
//         }}
//       >
//         {(isMobile || isTablet) && (
//           <Box
//             sx={{
//               position: "absolute",
//               top: { xs: 120, sm: 100, md: 90, lg: 58 },
//               right: { xs: 10, sm: 10, md: 16, lg: 16 },
//               zIndex: 1000,
//             }}
//           >
//             <Fab color="primary" aria-label="add" onClick={handleAdd}>
//               <Add />
//             </Fab>
//           </Box>
//         )}

//         {isDesktop && (
//           <Box position="absolute" top={90} right={16} zIndex={1000}>
//             <Fab color="primary" aria-label="add" onClick={handleAdd}>
//               <Add />
//             </Fab>
//           </Box>
//         )}
//         <Typography
//           variant="h6"
//           align="center"
//           gutterBottom
//           marginTop={11}
//           fontWeight={600}
//         >
//           Company name: {companyName}
//         </Typography>

//         <Paper
//           elevation={3}
//           sx={{
//             padding: { xs: "4px", sm: "4px", md: "4px", lg: "2px" },
//             marginTop: { xs: "8px", sm: "5px", md: "2px", lg: "2px" },
//             marginLeft: { xs: "0px", sm: "110px", md: "80px", lg: "100px" },
//             backgroundColor: "rgba(255, 255, 255, 0.7)",
//           }}
//         >
    
//           {isDesktop ? (
//             <TableContainer
//               component={Paper}
//               sx={{ backgroundColor: "rgba(199, 221, 211)" }}
//             >
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold" }}>Profile Pic</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Phone No</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
//                     {/* <TableCell sx={{ fontWeight: "bold" }}>Visibility</TableCell> */}
//                     <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedUsers.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell>
//                         <Avatar
//                           src={
//                             user.profile_picture ||
//                             "https://via.placeholder.com/40"
//                           }
//                           alt={user.full_name}
//                         />
//                       </TableCell>
//                       <TableCell>{"UID" + user.id}</TableCell>
//                       <TableCell>{user.full_name}</TableCell>
//                       <TableCell>{user.address}</TableCell>
//                       <TableCell>{user.phone_number}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       {/* <TableCell>
//                         {user.visibility ? (
//                           <Chip 
//                             label="Available"
//                             color="success"
//                             icon={<CheckCircleOutline />}  // Green check mark for available
//                           />
//                         ) : (
//                           <Chip 
//                             label="Disabled"
//                             color="error"
//                             icon={<Cancel />}  // Red cross for unavailable
//                           />
//                         )}
//                       </TableCell> */}
//                       <TableCell>
//                         <Tooltip title="Edit">
//                           <IconButton
//                             onClick={() => handleEdit(user.id)}
//                             color="success"
//                           >
//                             <Edit />
//                           </IconButton>
//                         </Tooltip>
//                         <IconButton
//                           aria-label="delete"
//                           size="large"
//                           onClick={() => handleDelete(user.id)}
//                           color="error"
//                         >
//                           <DeleteIcon fontSize="inherit" />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Grid container spacing={2}>
//               {paginatedUsers.map((user) => (
//                 <Grid item xs={12} sm={12} md={6} lg={4} key={user.id}>
//                   <TableContainer
//                     component={Paper}
//                     sx={{ backgroundColor: "rgba(199, 221, 211)" }}
//                   >
//                     <Table>
//                       <TableHead></TableHead>
//                       <TableBody>
//                         <TableRow>
//                           <TableCell>
//                             <strong>User ID:</strong>{" "}
//                           </TableCell>
//                           <TableCell>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: { xs: "100px", sm: "250px",md:"100px" },
//                               }}
//                             >
//                               {"UID" + user.id}
//                               <Avatar
//                                 src={user.profile_picture}
//                                 alt={user.full_name}
//                               />
//                             </Box>
//                           </TableCell>
//                         </TableRow>

//                         <TableRow>
//                           <TableCell>
//                             <strong>Full Name:</strong>{" "}
//                           </TableCell>
//                           <TableCell>{user.full_name}</TableCell>
//                         </TableRow>

//                         {expandedUser === user.id || !isTablet ? (
//                           <>
//                             <TableRow>
//                               <TableCell>
//                                 <strong>Address:</strong>{" "}
//                               </TableCell>
//                               <TableCell>{user.address}</TableCell>
//                             </TableRow>

//                             <TableRow>
//                               <TableCell>
//                                 <strong>Phone No:</strong>
//                               </TableCell>
//                               <TableCell>{user.phone_number}</TableCell>
//                             </TableRow>

//                             <TableRow>
//                               <TableCell>
//                                 <strong>Email:</strong>
//                               </TableCell>
//                               <TableCell> {user.email}</TableCell>
//                             </TableRow>
//                           </>
//                         ) : null}
//                       </TableBody>
//                     </Table>
//                     <Box display="flex" justifyContent="flex-end">
//                       <Tooltip title="Edit">
//                         <IconButton
//                           onClick={() => handleEdit(user.id)}
//                           color="success"
//                         >
//                           <Edit />
//                         </IconButton>
//                       </Tooltip>
//                       <IconButton
//                         aria-label="delete"
//                         size="large"
//                         onClick={() => handleDelete(user.id)}
//                         color="error"
//                       >
//                         <Delete />
//                       </IconButton>
//                       {isTablet && (
//                         <IconButton onClick={() => handleExpand(user.id)}>
//                           {expandedUser === user.id ? (
//                             <ExpandLess />
//                           ) : (
//                             <ExpandMore />
//                           )}
//                         </IconButton>
//                       )}
//                     </Box>
//                   </TableContainer>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//           <Box display="flex" justifyContent="center" marginTop={2}>
//             <Pagination
//               count={Math.ceil(users.length / rowsPerPage)}
//               page={page}
//               onChange={handleChangePage}
//               color="primary"
//               siblingCount={1}
//               boundaryCount={1}
//             />
//           </Box>
//         </Paper>

//         {/*--------------------------------Delete user--------------------*/}

//         <Dialog
//           open={openDelete}
//           onClose={handleCloseDelete}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           sx={{
//             "& .MuiDialog-paper": {
//               borderRadius: "20px",
//               backgroundColor: "rgba(199, 221, 211)",
//             },
//           }}
//         >
//           <DialogTitle id="alert-dialog-title">{"Delete user"}</DialogTitle>
//           <DialogContent>
//             <p>Are you sure you want to delete this user?</p>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDelete} color="primary">
//               No
//             </Button>
//             <Button onClick={confirmDelete} color="error" autoFocus>
//               Yes
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Container>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import NavBar7 from "../../Components/NavBar7";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CustomerAdminUser() {
  const [users, setUsers] = useState([]);
  const [companyName, setCompanyName] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState({
    profile_picture: "",
    email: "",
    phoneNumber: "",
    password: "",
    fullName: "",
    companyName: "",
    adminId: "",
    address: "",
    visibility: true,
  });


  const fetchManagers = async () => {
    try {
      const loggedInUserResponse = await fetch("/api/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!loggedInUserResponse.ok) {
        throw new Error("Failed to fetch logged-in user");
      }
      const loggedInUser = await loggedInUserResponse.json();
      const loggedInUserId = loggedInUser.id;
      setCompanyName(loggedInUser.company);
      const customerManagersResponse = await fetch(
        "/api/customeradmin/mymanagers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!customerManagersResponse.ok) {
        throw new Error("Failed to fetch customer managers");
      }
      const customerManagers = await customerManagersResponse.json();
      const filteredCustomerManagers = customerManagers.filter(
        (user) =>
          user.user_role === "customer-manager" &&
          user.createdById === loggedInUserId
      );
      setUsers(filteredCustomerManagers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const handleAdd = () => {
    navigate("/customeradminadd");
  };

  const handleEdit = (userId) => {
    navigate(`/customeradminedit/${userId}`);
  };

  const handleDelete = async (userId) => {
    setSelectedItemForDelete(userId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data;
      setSelectedUserData({
        profile_picture: userData.profile_picture,
        email: userData.email,
        phoneNumber: userData.phone_number,
        password: "",
        fullName: userData.full_name,
        companyName: userData.company,
        adminId: userData.id,
        address: userData.address,
        visibility: userData.visibility,
      });
      setOpenDelete(true);
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = async () => {
    try {
      const formData = new FormData();
      formData.append("full_name", selectedUserData.fullName);
      formData.append("address", selectedUserData.address);
      formData.append("email", selectedUserData.email);
      formData.append("phone_number", selectedUserData.phoneNumber);
      formData.append("user_role", "customer-admin");
      formData.append("company", selectedUserData.companyName);
      formData.append("profile_picture", selectedUserData.profile_picture);
      if (selectedUserData.password) {
        formData.append("password", selectedUserData.password);
      }
      if (selectedItemForDelete) {
        formData.append("visibility", false);
      }
      const token = localStorage.getItem("token");
      await axios.put(`/api/user/${selectedItemForDelete}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      handleCloseDelete();
      fetchManagers();
      alert("User successfully disabled");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div style={styles.container}>
      <NavBar7/>
      <div style={styles.content}>
      <div style={styles.container2}>
      <h1 style={styles.companyName}>Company Name: {companyName}</h1>
      <button style={styles.addButton} onClick={handleAdd}>
        Add New User
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Profile Pic</th>
            <th style={styles.th}>User ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Contact No.</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} style={styles.tr}>
              <td style={styles.td}>
                <img
                  src={user.profile_picture || "https://via.placeholder.com/40"}
                  alt={user.full_name}
                  style={styles.avatar}
                />
              </td>
              <td style={styles.td}>{user.id}</td>
              <td style={styles.td}>{user.full_name}</td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>{user.phone_number}</td>
              <td style={styles.td}>{user.address}</td>
              <td style={styles.td}>
                <button
                  style={styles.buttonEdit}
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  style={styles.buttonDelete}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        {Array.from(
          { length: Math.ceil(users.length / rowsPerPage) },
          (_, i) => (
            <button
              key={i}
              style={
                i + 1 === page
                  ? { ...styles.pageButton, ...styles.activePageButton }
                  : styles.pageButton
              }
              onClick={() => handleChangePage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
      {openDelete && (
        <div style={styles.dialog}>
          <h2>
            {selectedUserData.visibility
              ? "Delete User?"
              : "Re-Instate User?"}
          </h2>
          <p>
            {selectedUserData.visibility
              ? "Are you sure you want to delete this user?"
              : "Are you sure you want to re-instate this user?"}
          </p>
          <div style={styles.dialogActions}>
            <button style={styles.dialogButton} onClick={handleCloseDelete}>
              No
            </button>
            <button style={styles.dialogButton} onClick={confirmDelete}>
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", // Sidebar and content side by side
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh", // Ensure full height
  },
  content: {
    flex: 1, // Take remaining width after sidebar
    marginLeft: "200px", // Match the width of the NavBar7
    padding: "20px",
  },
  container2: {
    margin: "50px",
    padding: "20px",
    backgroundColor: "#00DDFFFF",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  companyName: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  addButton: {
    marginBottom: "10px",
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    padding: "10px",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  buttonEdit: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
    borderRadius: "5px",
  },
  buttonDelete: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  pageButton: {
    border: "1px solid #ddd",
    padding: "5px 10px",
    cursor: "pointer",
  },
  activePageButton: {
    backgroundColor: "#007BFF",
    color: "white",
  },
  dialog: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  dialogButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};
