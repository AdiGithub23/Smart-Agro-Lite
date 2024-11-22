//#region Original Code
// import React, { useState, useEffect } from "react";
// import { Box, Grid, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const PackagePage = () => {
//   const [layout, setLayout] = useState("threeGrid");
//   const [packages, setPackages] = useState([]);
//   const [filteredPackages, setFilteredPackages] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get("/api/packages");
//         const visiblePackages = response.data.filter(
//           (pkg) => pkg.landingPageVisibility === true
//         );
//         setPackages(visiblePackages);
//         setFilteredPackages(
//           visiblePackages.filter((pkg) => pkg.poleOrPortable === "Pole")
//         );
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const handleLayoutChange = (newLayout) => {
//     setLayout(newLayout);
//     // Filter the packages based on the selected layout
//     const type = newLayout === "threeGrid" ? "Pole" : "Portable";
//     setFilteredPackages(packages.filter((pkg) => pkg.poleOrPortable === type));
//   };

//   const navigateToPage = (page) => {
//     let elementId = "";
//     switch (page) {
//       case "Contact Us":
//         elementId = "contact";
//         break;
//       default:
//         elementId = "";
//     }

//     if (elementId) {
//       const element = document.getElementById(elementId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(to bottom, #B6E9C8, #72ad87)",
//         width: "auto",
//         height: "auto",
//         alignItems: "center",
//         padding: { xs: "10px", sm: "20px" },
//       }}
//     >
//       {/* Buttons for switching layouts */}
//       <Box
//         sx={{
//           textAlign: "center",
//           marginTop: { xs: "70px", sm: "70px", md: "60px",lg:"70px" },
//           marginBottom: "10px",
//         }}
//       >
//         <Button
//           variant={layout === "threeGrid" ? "contained" : "outlined"}
//           onClick={() => handleLayoutChange("threeGrid")}
//           sx={{
//             marginRight: "10px",
//             backgroundColor: layout === "threeGrid" ? "#61B44A" : "transparent",
//             color: layout === "threeGrid" ? "white" : "#61B44A",
//             fontWeight: "bold",
//             borderColor: "#61B44A",
//             "&:hover": {
//               backgroundColor: layout === "threeGrid" ? "#61B44A" : "#E8F5E9",
//               color: layout === "threeGrid" ? "white" : "#61B44A",
//               borderColor: "#61B44A",
//             },
//           }}
//         >
//           Fazenda Pole
//         </Button>
//         <Button
//           variant={layout === "oneGrid" ? "contained" : "outlined"}
//           onClick={() => handleLayoutChange("oneGrid")}
//           sx={{
//             backgroundColor: layout === "oneGrid" ? "#61B44A" : "transparent",
//             color: layout === "oneGrid" ? "white" : "#61B44A",
//             fontWeight: "bold",
//             borderColor: "#61B44A",
//             "&:hover": {
//               backgroundColor: layout === "oneGrid" ? "#61B44A" : "#E8F5E9",
//               color: layout === "oneGrid" ? "white" : "#61B44A",
//               borderColor: "#61B44A",
//             },
//           }}
//         >
//           Fazenda Portable
//         </Button>
//       </Box>

//       <Grid
//         container
//         spacing={6}
//         justifyContent="center"
//         sx={{
//           maxWidth: { xs: "90%", sm: "90%", md: "100%" ,lg:"90%"},
//           marginLeft: { xs: "10px", sm: "30px", md: "0px",lg:"100px" },
//           marginTop: { xs: "30px", sm: "50px", md: "0px",lg:"20px" },
         
//           marginBottom: "50px",
//         }}
//       >
//         {filteredPackages.map((pkg, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Box
//               sx={{
//                 textAlign: "center",
//                 backgroundColor: "rgba(255, 255, 255, 0.2)",
//                 padding: { xs: "10px", sm: "20px", md: "10px",lg:"20px" },
//                 borderRadius: "15px",
//                 height: "auto",
//                 width: "auto",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 transition: "transform 0.3s",
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                 },
//               }}
//             >
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 {pkg.packageName}
//               </Typography>

//               <Box
//                 sx={{
//                   width: "100%",
//                   flexGrow: 1,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   variant="subtitle1"
//                   gutterBottom
//                   sx={{ textAlign: "center" }}
//                 >
//                   <>
//                     {Array.isArray(pkg.parameters) ||
//                     typeof pkg.parameters === "string" ? (
//                       <>
//                         <h3>Parameters</h3>
//                         {Array.isArray(pkg.parameters)
//                           ? pkg.parameters.map((parameter, idx) => (
//                               <React.Fragment key={`parameter-${idx}`}>
//                                 {parameter}
//                                 <br />
//                               </React.Fragment>
//                             ))
//                           : pkg.parameters.split(",").map((parameter, idx) => (
//                               <React.Fragment key={`parameter-${idx}`}>
//                                 {parameter.trim()}
//                                 <br />
//                               </React.Fragment>
//                             ))}
//                       </>
//                     ) : (
//                       "No parameters available"
//                     )}

//                     {Array.isArray(pkg.features) ||
//                     typeof pkg.features === "string" ? (
//                       <>
//                         <h3>Features</h3>
//                         {Array.isArray(pkg.features)
//                           ? pkg.features.map((feature, idx) => (
//                               <React.Fragment key={`feature-${idx}`}>
//                                 {feature}
//                                 <br />
//                               </React.Fragment>
//                             ))
//                           : pkg.features.split(",").map((feature, idx) => (
//                               <React.Fragment key={`feature-${idx}`}>
//                                 {feature.trim()}
//                                 <br />
//                               </React.Fragment>
//                             ))}
//                       </>
//                     ) : (
//                       "No features available"
//                     )}
//                   </>
//                 </Typography>
//               </Box>

//               <Box sx={{ flexGrow: 0 }}>
//                 <Button
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#61B44A",
//                     color: "#fff",
//                     "&:hover": {
//                       backgroundColor: "#4E7F41",
//                     },
//                   }}
//                   onClick={() => navigateToPage("Contact Us")}
//                 >
//                   Request for a Demo
//                 </Button>
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default PackagePage;
//#endregion





import React, { useState, useEffect } from "react";
import axios from "axios";

const PackagePage = () => {
  const [layout, setLayout] = useState("threeGrid");
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/api/packages");
        const visiblePackages = response.data.filter(
          (pkg) => pkg.landingPageVisibility === true
        );
        setPackages(visiblePackages);
        setFilteredPackages(
          visiblePackages.filter((pkg) => pkg.poleOrPortable === "Pole")
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchPackages();
  }, []);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    const type = newLayout === "threeGrid" ? "Pole" : "Portable";
    setFilteredPackages(packages.filter((pkg) => pkg.poleOrPortable === type));
  };

  const navigateToPage = (page) => {
    let elementId = "";
    switch (page) {
      case "Contact Us":
        elementId = "contact";
        break;
      default:
        elementId = "";
    }
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="package-page">
      {/* Layout buttons */}
      <div className="layout-buttons">
        <button onClick={() => handleLayoutChange("threeGrid")}>Fazenda Pole</button>
        <button onClick={() => handleLayoutChange("oneGrid")}>Fazenda Portable</button>
      </div>

      {/* Package List */}
      <div className={`package-list ${layout}`}>
        {filteredPackages.map((pkg, index) => (
          <div className="package-item" key={index}>
            <div className="package-header">
              <h3>{pkg.packageName}</h3>
            </div>

            <div className="package-details">
              <div className="parameters">
                {Array.isArray(pkg.parameters) || typeof pkg.parameters === "string" ? (
                  <>
                    <h4>Parameters</h4>
                    {Array.isArray(pkg.parameters)
                      ? pkg.parameters.map((parameter, idx) => (
                          <p key={`parameter-${idx}`}>{parameter}</p>
                        ))
                      : pkg.parameters.split(",").map((parameter, idx) => (
                          <p key={`parameter-${idx}`}>{parameter.trim()}</p>
                        ))}
                  </>
                ) : (
                  <p>No parameters available</p>
                )}
              </div>

              <div className="features">
                {Array.isArray(pkg.features) || typeof pkg.features === "string" ? (
                  <>
                    <h4>Features</h4>
                    {Array.isArray(pkg.features)
                      ? pkg.features.map((feature, idx) => (
                          <p key={`feature-${idx}`}>{feature}</p>
                        ))
                      : pkg.features.split(",").map((feature, idx) => (
                          <p key={`feature-${idx}`}>{feature.trim()}</p>
                        ))}
                  </>
                ) : (
                  <p>No features available</p>
                )}
              </div>
            </div>

            <div className="demo-button">
              <button onClick={() => navigateToPage("Contact Us")}>Request for a Demo</button>
            </div>
          </div>
        ))}
      </div>

      {/* Inline styles */}
      <style>
        {`
          .package-page {
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
          }

          .layout-buttons {
            text-align: center;
            margin-bottom: 20px;
          }

          .layout-buttons button {
            padding: 10px 20px;
            font-size: 16px;
            margin: 0 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .layout-buttons button:hover {
            background-color: #0056b3;
          }

          .package-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
          }

          .package-item {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            width: calc(33% - 20px);
            box-sizing: border-box;
          }

          .package-header h3 {
            margin-top: 0;
            font-size: 1.5rem;
            color: #333;
          }

          .package-details {
            margin-top: 15px;
          }

          .parameters, .features {
            margin-bottom: 20px;
          }

          .parameters h4, .features h4 {
            font-size: 1.2rem;
            color: #333;
          }

          .parameters p, .features p {
            font-size: 1rem;
            color: #555;
            margin: 5px 0;
          }

          .demo-button {
            margin-top: 20px;
            text-align: center;
          }

          .demo-button button {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .demo-button button:hover {
            background-color: #218838;
          }

          @media (max-width: 768px) {
            .package-item {
              width: calc(50% - 20px);
            }
          }

          @media (max-width: 480px) {
            .package-item {
              width: 100%;
            }
          }
        `}
      </style>
      
    </div>
  );
};

export default PackagePage;
