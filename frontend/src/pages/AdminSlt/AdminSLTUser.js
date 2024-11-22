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
//   Typography,
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
// } from "@mui/material";
// import { Edit, Add, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
// import NavBar2 from "../../Components/NavBar2";
// import DeleteIcon from "@mui/icons-material/Delete";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import axios from "axios";
// export default function AdminSLTUser() {
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


//   const fetchCustomerAdmins = async () => {
//     try {
//       const response = await fetch("/api/user");
//       const data = await response.json();
      
//       // Filter out only the users with "customer-admin" role
//       const customerAdmins = data.filter(
//         user => user.user_role === "customer-admin"
//         // (user) => user.user_role === "customer-admin" && user.visibility === true
//       );
      
//       // Set the users state
//       setUsers(customerAdmins);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
//   useEffect(() => {
//     // fetch("/api/user")
//     //   .then((response) => response.json())
//     //   .then((data) => {
//     //     const customerAdminUsers = data.filter(
//     //       (user) => user.user_role === "customer-admin"
//     //     );
//     //     setUsers(customerAdminUsers);
//     //   })
//     //   .catch((error) => console.error("Error fetching users:", error));
      
//     fetchCustomerAdmins();

//   }, []);
//   useEffect(() => {
//     console.log("selectedItemForDelete:", selectedItemForDelete);
//   }, [selectedItemForDelete]);  
//   useEffect(() => {
//     console.log("selectedUserData:", selectedUserData);
//   }, [selectedUserData]);


//   const handleAdd = () => {
//     navigate("/Adminsltadd");
//   };
//   const handleEdit = (userId) => {
//     navigate(`/adminsltedit/${userId}`);
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
//       fetchCustomerAdmins();

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
//           width: { xs: "102%", sm: "90%" },
//           height: "auto",
//           display: "flex",
//           flexDirection: "column",
//           marginRight: "2px",
//         }}
//       >
//         <NavBar2 />

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
//             padding: { xs: "0px", sm: "4px", md: "4px", lg: "2px" },
//             marginTop: { xs: "110px", sm: "100px", md: "96px", lg: "90px" },
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
//                             user.profile_picture ||
//                             "https://via.placeholder.com/40"
//                           }
//                           alt={user.name}
//                         />
//                       </TableCell>
//                       <TableCell>{"UID"+user.id}</TableCell>
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
//                              <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: { xs: "100px", sm: "250px",md:"100px" },
//                               }}
//                             >
//                                {"UID"+user.id}
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
import NavBar2 from "../../Components/NavBar2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminSLTUser() {
  const [successMessage, setSuccessMessage] = useState(""); 
  const [expandedUser, setExpandedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(6);
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

  const fetchCustomerAdmins = async () => {
    try {
      const response = await fetch("/api/user");
      const data = await response.json();
      const customerAdmins = data.filter(
        (user) => user.user_role === "customer-admin"
      );
      setUsers(customerAdmins);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomerAdmins();
  }, []);

  const handleAdd = () => {
    navigate("/Adminsltadd");
  };

  const handleEdit = (userId) => {
    navigate(`/adminsltedit/${userId}`);
  };

  const handleDelete = async (userId) => {
    setSelectedItemForDelete(userId);
    const fetchUserData = async () => {
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
      formData.append("user_role", "customer-admin");
      formData.append("company", selectedUserData.companyName);
      formData.append("profile_picture", selectedUserData.profile_picture);
      if (selectedUserData.password) {
        formData.append("password", selectedUserData.password);
      }
      if (selectedItemForDelete) {
        formData.append("visibility", !selectedUserData.visibility);
      }
      const token = localStorage.getItem("token");
      await axios.put(`/api/user/${selectedItemForDelete}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setOpenDelete(false);
      alert("The status changed successfully");
      fetchCustomerAdmins();
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
      <NavBar2/>
      <div style={styles.container2}>
      <h1 style={styles.title}>Admin SLT Users</h1>
      <button style={styles.addButton} onClick={handleAdd}>
        Add New User
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Profile Pic</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Address</th>
            <th>Company Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.profile_picture || "https://via.placeholder.com/40"}
                  alt={user.name}
                  style={styles.avatar}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.address}</td>
              <td>{user.company}</td>
              <td>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
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
          (_, index) => (
            <button
              key={index + 1}
              style={styles.pageButton}
              onClick={() => handleChangePage(index + 1)}
            >
              {index + 1}
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
            <button style={styles.cancelButton} onClick={handleCloseDelete}>
              Cancel
            </button>
            <button style={styles.confirmButton} onClick={confirmDelete}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
  },
  container2: {
    margin: "50px",
    marginLeft: "200px",
    padding: "20px",
    backgroundColor: "#00DDFFFF",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
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
    textAlign: "center"
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  editButton: {
    marginRight: "10px",
    padding: "5px 10px",
    backgroundColor: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
  },
  pageButton: {
    padding: "5px 10px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  dialog: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
