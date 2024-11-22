// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Grid,
//   Paper,
//   Avatar,
//   IconButton,
//   Tooltip,
//   Container,
//   Box,
//   Fab,
//   Pagination,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Button,
//   DialogActions,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { Edit, Delete, Add, ExpandMore, ExpandLess } from "@mui/icons-material";
// import NavBar from "../../Components/NavBar";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import axios from "axios";

// export default function SuperAdminUser() {
//   const [successMessage, setSuccessMessage] = useState(""); 
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(6);
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


//   const fetchSltAdminUsers = async () => {
//     try {
//       const response = await fetch("/api/user");
//       const data = await response.json();
      
//       // Filter out only the users with "slt-admin" role
//       const sltAdminUsers = data.filter(
//         user => user.user_role === "slt-admin"
//         // (user) => user.user_role === "slt-admin" && user.visibility === true
//       );
      
//       // Set the users state
//       setUsers(sltAdminUsers);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
//   useEffect(() => {
//     // fetch("/api/user")
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     const sltAdminUsers = data.filter(
//     //       (user) => user.user_role === "slt-admin"
//     //     );
//     //     setUsers(sltAdminUsers);
//     //   })
//     //   .catch((error) => console.error("Error fetching users:", error));

//     fetchSltAdminUsers();

//   }, []);
//   useEffect(() => {
//     console.log("selectedItemForDelete:", selectedItemForDelete);
//   }, [selectedItemForDelete]);  
//   useEffect(() => {
//     console.log("selectedUserData:", selectedUserData);
//   }, [selectedUserData]);


//   const handleAdd = () => {
//     navigate("/superadminadd");
//   };
//   const handleEdit = (userId) => {
//     navigate(`/superadminedit/${userId}`);
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
    
//     // console.log(`handleSubmitForm for userId: ${userId} !!!`);
//     // console.log(`handleSubmitForm for selectedItemForDelete: ${selectedItemForDelete}`);
  

//   };
//   // const confirmDelete = () => {
//   //   if (selectedItemForDelete) {
//   //     setUsers(users.filter((user) => user.id !== selectedItemForDelete));
//   //   }
//   //   setOpenDelete(false);
//   // };
//   // const confirmDelete = () => {
//   //   console.log(`\nhandleSubmitForm function triggered for ${selectedItemForDelete} !!!`);
//   //   if (selectedItemForDelete) {
//   //     fetch(`/api/user/${selectedItemForDelete}`, {
//   //       method: "DELETE",
//   //     })
//   //       .then((response) => {
//   //         if (response.ok) {
//   //           setUsers(users.filter((user) => user.id !== selectedItemForDelete));
//   //           console.log(`${selectedItemForDelete} is deleted !!!`);

//   //           alert(`Selected SLT Admin is deleted !!!`)
//   //           // setSuccessMessage(`SLT Admin user is deleted !!!`);
//   //           // setTimeout(() => {
//   //           //   setSuccessMessage("");
//   //           // }, 2000);

//   //         } else {
//   //           console.error("Error deleting user:", response.statusText);
//   //         }
//   //       })
//   //       .catch((error) => console.error("Error deleting user:", error))
//   //       .finally(() => {
//   //         setOpenDelete(false);
//   //         setSelectedItemForDelete(null);
//   //       });
//   //   }
//   // };
//   const confirmDelete = async () => {
//     console.log(`\nhandleSubmitForm function triggered for ${selectedItemForDelete} !!!`);
//     try {     
//       const formData = new FormData();
//       formData.append("full_name", selectedUserData.fullName);
//       formData.append("address", selectedUserData.address);
//       formData.append("email", selectedUserData.email);
//       formData.append("phone_number", selectedUserData.phoneNumber);
//       formData.append("user_role", "slt-admin");
//       formData.append("company", selectedUserData.companyName);
//       formData.append("profile_picture", selectedUserData.profile_picture);
//       if (selectedUserData.password) {
//         formData.append("password", selectedUserData.password);
//       }
//       if (selectedItemForDelete) {
//         // formData.append("visibility", false);
//         formData.append("visibility", !selectedUserData.visibility);
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
//       console.log("Sent Request");
//       console.log("User created successfully:", response.data);
//       handleCloseDelete();
//       alert("The status changed successfully");
//       fetchSltAdminUsers();

//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };
//   const handleCloseDelete = () => {
//     setOpenDelete(false);
//   };


//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleExpand = (userId) => {
//     setExpandedUser(expandedUser === userId ? null : userId);
//   };
//   const paginatedUsers = users.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );


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
//         <NavBar />

//         {(isMobile || isTablet) && (
//           <Box
//             sx={{
//               position: "absolute",
//               top: { xs: 60, sm: 70, md: 68, lg: 58 },
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
//           <Box position="absolute" top={69} right={16} zIndex={1000}>
//             <Fab color="primary" aria-label="add" onClick={handleAdd}>
//               <Add />
//             </Fab>
//           </Box>
//         )}

//         <Paper
//           elevation={3}
//           sx={{
//             padding: { xs: "4px", sm: "4px", md: "4px", lg: "2px" },
//             marginTop: { xs: "110px", sm: "100px", md: "120px", lg: "90px" },
//             marginLeft: { xs: "0px", sm: "110px", md: "80px", lg: "100px" },
//             backgroundColor: "rgba(255, 255, 255, 0.7)",
//           }}
//         >
//           {successMessage && (
//             <div style={{ color: "green", fontWeight: "bold" }}>
//               {successMessage}
//             </div>
//           )}
      
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
//                     <TableCell sx={{ fontWeight: "bold" }}>Company Name</TableCell>
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
//                             user.profile_picture 
                            
//                           }
//                           alt={user.name}
//                         />
//                       </TableCell>
//                       <TableCell>UID{user.id}</TableCell>
//                       <TableCell>{user.full_name}</TableCell>
//                       <TableCell>{user.address}</TableCell>
//                       <TableCell>{user.phone_number}</TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell>{user.company}</TableCell>
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
//                           <Delete />
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
//                           <TableCell><Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: { xs: "100px", sm: "250px",md:"100px" },
//                               }}
//                             > UID{user.id}
//                             <Avatar src={user.profilePic} alt={user.name} />
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

//                             <TableRow>
//                               <TableCell>
//                                 <strong>Company Name:</strong>{" "}
//                               </TableCell>
//                               <TableCell>{user.company}</TableCell>
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
//           <DialogTitle id="alert-dialog-title">
//             {selectedUserData.visibility ? "Delete User?" 
//               : "Re-Instate User?"
//             }
//           </DialogTitle>
//           <DialogContent>
//             {selectedUserData.visibility ? "Are you sure you want to delete this user?" 
//               : "Are you sure you want to re-instate this user?"
//             }
//             {/* <p>Are you sure you want to delete this user?</p> */}
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
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import axios from "axios";

export default function SuperAdminUser() {
  const [successMessage, setSuccessMessage] = useState(""); 
  const [expandedUser, setExpandedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItemForDelete, setSelectedItemForDelete] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState({
    profile_picture: '',
    email: '',
    phoneNumber: '',
    password: '',
    fullName: '',
    companyName: '',
    adminId: '',
    address: '',
    visibility: true,
  });

  const fetchSltAdminUsers = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      const sltAdminUsers = data.filter(
        user => user.user_role === "slt-admin"
      );
      setUsers(sltAdminUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSltAdminUsers();
  }, []);

  const handleAdd = () => {
    navigate("/superadminadd");
  };

  const handleEdit = (userId) => {
    navigate(`/superadminedit/${userId}`);
  };

  const handleDelete = async (userId) => {
    setSelectedItemForDelete(userId);
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
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
          password: '', 
          fullName: userData.full_name,
          companyName: userData.company,
          adminId: userData.id,
          address: userData.address,
          visibility: userData.visibility,
        }); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {     
      const formData = new FormData();
      formData.append("full_name", selectedUserData.fullName);
      formData.append("address", selectedUserData.address);
      formData.append("email", selectedUserData.email);
      formData.append("phone_number", selectedUserData.phoneNumber);
      formData.append("user_role", "slt-admin");
      formData.append("company", selectedUserData.companyName);
      formData.append("profile_picture", selectedUserData.profile_picture);
      if (selectedUserData.password) {
        formData.append("password", selectedUserData.password);
      }
      if (selectedItemForDelete) {
        formData.append("visibility", !selectedUserData.visibility);
      }
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `/api/user/${selectedItemForDelete}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleCloseDelete();
      alert("The status changed successfully");
      fetchSltAdminUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedUsers = users.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div style={{ display: "flex" }}>
    <NavBar />
    <div style={{ flex: 1, margin: "50px", fontFamily: "Arial, sans-serif"}}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Super Admin User Management</h2>
      <button 
        onClick={handleAdd}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add New User
      </button>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Profile Pic</th>
            <th style={styles.tableHeader}>User ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Company Name</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id} style={styles.tableRow}>
              <td style={styles.tableCell}>
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  style={styles.profileImage}
                />
              </td>
              <td style={styles.tableCell}>{user.id}</td>
              <td style={styles.tableCell}>{user.full_name}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>{user.company}</td>
              <td style={styles.tableCell}>
                <button 
                  onClick={() => handleEdit(user.id)} 
                  style={styles.actionButton}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(user.id)} 
                  style={{ ...styles.actionButton, backgroundColor: "#f44336" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button 
          onClick={(e) => handleChangePage(e, page - 1)}
          disabled={page === 1}
          style={styles.paginationButton}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button 
          onClick={(e) => handleChangePage(e, page + 1)}
          disabled={page * rowsPerPage >= users.length}
          style={styles.paginationButton}
        >
          Next
        </button>
      </div>


      {/* Delete/Restore Dialog */}
      {openDelete && (
        <div style={styles.dialogOverlay}>
          <div style={styles.dialogBox}>
            <h3>{selectedUserData.visibility ? "Delete User?" : "Re-Instate User?"}</h3>
            <p>
              {selectedUserData.visibility ? "Are you sure to delete this user?" : "Are you sure to re-instate this user?"}
            </p>
            <div style={styles.dialogActions}>
              <button onClick={handleCloseDelete} style={styles.dialogButton}>No</button>
              <button onClick={confirmDelete} style={{ ...styles.dialogButton, backgroundColor: "#4CAF50" }}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

const styles = {
  tableHeader: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  actionButton: {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  paginationButton: {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  dialogOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    textAlign: "center",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  dialogButton: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

