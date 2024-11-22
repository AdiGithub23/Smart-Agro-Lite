//#region Original Code
// import React, { useEffect, useState } from "react";
// import { Box, Button, Container, TextField, Grid } from "@mui/material";
// import Header from "../../Components/InfoCard";
// import ChartComponent from "../../Components/Graph";
// import NavBar3 from "../../Components/NavBar3";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import axios from "axios";
// const DevicesRealTime = () => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:1200px)");
//   const isDesktop = !isMobile && !isTablet;
//   const backgroundStyle = {
//     backgroundColor: "#8FBAA6",
//     padding: isMobile ? "0px 20px 100px 0px" : "0px 0px 100px 0px",
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
//           width: { xs: "100%", sm: "95%", md: "95%", lg: "90%" },

//           height: "auto",
//           display: "flex",
//           flexDirection: "column",
//           marginRight: "0px",
//           mt: 3,
//         }}
//       >
//         <NavBar3 />
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             marginLeft: { xs: "10px", sm: "115px", md: "110px", lg: "80px" },
//           }}
//         >
//           <Header />

//           {/*---------------------Charts-----------------------*/}
//           <ChartComponent />
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default DevicesRealTime;
//#endregion


import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// Importing custom components (ensure these components are already defined in your project)
import Header from "../../Components/InfoCard";
import ChartComponent from "../../Components/Graph";
import NavBar3 from "../../Components/NavBar3";

const DevicesRealTime = () => {
  const [data, setData] = useState(null);

  // UseEffect can be used here if needed for fetching any data
  useEffect(() => {
    // For example, fetch data from an API (if required for the real-time page)
    axios.get("/api/real-time-data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="devices-real-time">
      <div className="navbar">
        <NavBar3 />
      </div>

      <div className="content">
        <div className="header">
          <Header />
        </div>

        <div className="chart">
          <ChartComponent data={data} />
        </div>
      </div>

      <style jsx>{`
        /* General page styling */
        .devices-real-time {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          color: #333;
          margin: 0;
          padding: 0;
        }

        /* Navbar styles */
        .navbar {
          background-color: #2b3832;
          padding: 15px;
          text-align: center;
        }

        /* Content container */
        .content {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
        }

        /* Header */
        .header {
          margin-bottom: 20px;
        }

        /* Chart Section */
        .chart {
          margin-top: 20px;
        }

        /* Responsive design for smaller screens */
        @media (max-width: 768px) {
          .content {
            padding: 10px;
          }

          .header {
            margin-bottom: 10px;
          }

          .chart {
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default DevicesRealTime;
