//#region Original Code
// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid, Paper } from "@mui/material";
// import NotificationD from "../../Components/NotificationDAnalysis.js";
// import { Line } from "react-chartjs-2";
// import "chart.js/auto";
// import {
//   lineElementClasses,
//   markElementClasses,
// } from '@mui/x-charts/LineChart';
// import { Chart as ChartJS, registerables } from "chart.js";
// import annotationPlugin from "chartjs-plugin-annotation";
// import NavBar3 from "../../Components/NavBar3";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import axios from "axios";
// ChartJS.register(...registerables, annotationPlugin);
// const backgroundStyle = {
//   backgroundColor: "#8FBAA6",
//   padding: "10px 0px 100px 0px",
//   minHeight: "100vh",
//   width: "100%",
//   position: "absolute",
//   top: 0,
//   left: 0,
//   zIndex: -1,
// };
// const DevicesAnalysis = () => {
//   const [graphData, setGraphData] = useState([]);
//   const deviceId = localStorage.getItem("DeviceID");

//   useEffect(() => {
//     const fetchParameters = async () => {
//       try {
//         if (!deviceId) {
//           throw new Error("No Devices found for your account");
//         }
//         const dataResponse = await axios.get(`/api/analysis/${deviceId}`);
//         setGraphData(dataResponse.data);
//       } catch (err) {
//         alert(err.message || "An error occurred");
//       }
//     };

//     fetchParameters();
//   }, [deviceId]);


//   return (
//     <div style={backgroundStyle}>
//       <Box
//         sx={{
//           padding: { xs: "13px", sm: "20px", md: "20px", lg: "20px" },
//           mt: { xs: 15, sm: 15, md: 15, lg: 10 },
//           width: { xs: "80%", sm: "60%", md: "75%", lg: "55%" },
//         }}
//       >
//         <NavBar3 />
//         <Grid
//           container
//           spacing={3}
//           sx={{ marginLeft: { xs: 0, sm: 24, md: 18, lg: 28 } }}
//         >
//           {graphData.map((graphLabel, index) => {
//             const yMinThreshold = graphLabel.minThresholdValue;
//             const yMaxThreshold = graphLabel.maxThresholdValue;

//             return (
//               <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
//                 <Paper elevation={3} sx={{ padding: "10px",backgroundColor:"#c7ddd3" }}>
//                   <Typography
//                     variant="h6"
//                     align="center"
//                     sx={{ marginBottom: "10px" }}
//                   >
//                     {graphLabel.label}
//                   </Typography>
//                   <Line
                  
//                     data={{
//                       labels: graphLabel.values.map((point) => point.time),
//                       datasets: [
//                         {
//                           label: `${graphLabel.label}`,
//                           data: graphLabel.values.map((point) => point.value),
//                           borderColor: "black",
//                           backgroundColor: "transparent", 
//                           fill: false, 
//                           borderWidth: 1.5,
//                           pointRadius:1.5,
//                         },
//                       ],
//                     }}
//                     options={{
//                       scales: {
//                         x: {
//                           ticks: {
//                             color: "#2b3832", 
//                           },
//                         },
//                         y: {
//                           min: graphLabel.minParameterValue,
//                           max: graphLabel.maxParameterValue,
//                           ticks: {
//                             color: "#2b3832", 
//                           },
//                         },
//                       },
//                       plugins: {
//                         legend: {
//                           display: false,
//                         },                        
//                         annotation: {
//                           annotations: [
//                             ...(yMinThreshold !== null ? [{
//                               type: "line",
//                               yMin: yMinThreshold,
//                               yMax: yMinThreshold,
//                               borderColor: "blue",
//                               borderWidth: 1,
//                               borderDash: [5, 2],
//                               label: {
//                                 content: `Min Threshold: ${yMinThreshold}`,
//                                 enabled: true,
//                                 position: "top",
//                                 backgroundColor: "blue",
//                                 color: "white",
//                               },
//                             }] : []),
//                             ...(yMaxThreshold !== null ? [{
//                               type: "line",
//                               yMin: yMaxThreshold,
//                               yMax: yMaxThreshold,
//                               borderColor: "red",
//                               borderWidth: 1,
//                               borderDash: [5, 2],
//                               label: {
//                                 content: `Max Threshold: ${yMaxThreshold}`,
//                                 enabled: true,
//                                 position: "top",
//                                 backgroundColor: "red",
//                                 color: "white",
//                               },
//                             }] : []),
//                             ...graphLabel.values.map((point, index) => {
//                               if (index === graphLabel.values.length - 1) return null; 

//                               const currentTime = graphLabel.values[index].time;
//                               const nextTime = graphLabel.values[index + 1].time;

//                               let color;
//                               if (point.value >= graphLabel.maxThresholdValue) {
//                                 color = "rgba(255, 0, 0, 0.3)"; 
//                               } else if (point.value <= graphLabel.minThresholdValue) {
//                                 color = "rgba(0, 0, 255, 0.3)"; 
//                               } else {
//                                 color = "rgba(0, 255, 0, 0.3)"; 
//                               }

//                               return {
//                                 type: "box",
//                                 xMin: currentTime,
//                                 xMax: nextTime, 
//                                 yMin: graphLabel.minParameterValue,
//                                 yMax: graphLabel.maxParameterValue, 
//                                 backgroundColor: color,
//                                 borderWidth: 0, 
//                               };
//                             }).filter(annotation => annotation !== null), 
//                           ],
//                         },
//                       },
//                     }}
//                   />
//                 </Paper>
//               </Grid>
//             );
//           })}
//         </Grid>
//         <NotificationD />
//       </Box>
//     </div>
//   );
// };

// export default DevicesAnalysis;
//#endregion




import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Chart as ChartJS, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import axios from "axios";

ChartJS.register(...registerables, annotationPlugin);

const DevicesAnalysis = () => {
  const [graphData, setGraphData] = useState([]);
  const deviceId = localStorage.getItem("DeviceID");

  useEffect(() => {
    const fetchParameters = async () => {
      try {
        if (!deviceId) {
          throw new Error("No Devices found for your account");
        }
        const dataResponse = await axios.get(`/api/analysis/${deviceId}`);
        setGraphData(dataResponse.data);
      } catch (err) {
        alert(err.message || "An error occurred");
      }
    };
    fetchParameters();
  }, [deviceId]);

  return (
    <div className="devices-analysis-container">
      <header className="navbar">
        {/* Placeholder for the NavBar */}
        <h1>Device Analysis</h1>
      </header>
      
      <main className="content">
        {graphData.map((graphLabel, index) => {
          const yMinThreshold = graphLabel.minThresholdValue;
          const yMaxThreshold = graphLabel.maxThresholdValue;
          return (
            <div className="graph-container" key={index}>
              <div className="graph-header">
                <h2>{graphLabel.label}</h2>
              </div>
              <div className="graph">
                <Line
                  data={{
                    labels: graphLabel.values.map((point) => point.time),
                    datasets: [
                      {
                        label: `${graphLabel.label}`,
                        data: graphLabel.values.map((point) => point.value),
                        borderColor: "black",
                        backgroundColor: "transparent",
                        fill: false,
                        borderWidth: 1.5,
                        pointRadius: 1.5,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        ticks: {
                          color: "#2b3832",
                        },
                      },
                      y: {
                        min: graphLabel.minParameterValue,
                        max: graphLabel.maxParameterValue,
                        ticks: {
                          color: "#2b3832",
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                      annotation: {
                        annotations: [
                          ...(yMinThreshold !== null
                            ? [
                                {
                                  type: "line",
                                  yMin: yMinThreshold,
                                  yMax: yMinThreshold,
                                  borderColor: "blue",
                                  borderWidth: 1,
                                  borderDash: [5, 2],
                                  label: {
                                    content: `Min Threshold: ${yMinThreshold}`,
                                    enabled: true,
                                    position: "top",
                                    backgroundColor: "blue",
                                    color: "white",
                                  },
                                },
                              ]
                            : []),
                          ...(yMaxThreshold !== null
                            ? [
                                {
                                  type: "line",
                                  yMin: yMaxThreshold,
                                  yMax: yMaxThreshold,
                                  borderColor: "red",
                                  borderWidth: 1,
                                  borderDash: [5, 2],
                                  label: {
                                    content: `Max Threshold: ${yMaxThreshold}`,
                                    enabled: true,
                                    position: "top",
                                    backgroundColor: "red",
                                    color: "white",
                                  },
                                },
                              ]
                            : []),
                          ...graphLabel.values
                            .map((point, index) => {
                              if (index === graphLabel.values.length - 1) return null;

                              const currentTime = graphLabel.values[index].time;
                              const nextTime = graphLabel.values[index + 1].time;

                              let color;
                              if (point.value >= graphLabel.maxThresholdValue) {
                                color = "rgba(255, 0, 0, 0.3)";
                              } else if (point.value <= graphLabel.minThresholdValue) {
                                color = "rgba(0, 0, 255, 0.3)";
                              } else {
                                color = "rgba(0, 255, 0, 0.3)";
                              }

                              return {
                                type: "box",
                                xMin: currentTime,
                                xMax: nextTime,
                                yMin: graphLabel.minParameterValue,
                                yMax: graphLabel.maxParameterValue,
                                backgroundColor: color,
                                borderWidth: 0,
                              };
                            })
                            .filter((annotation) => annotation !== null),
                        ],
                      },
                    },
                  }}
                />
              </div>
            </div>
          );
        })}
      </main>

      <footer className="footer">
        {/* Placeholder for Notifications */}
        <p>Notifications Area</p>
      </footer>

      <style jsx>{`
        /* Styling for the Devices Analysis Page */
        .devices-analysis-container {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }

        .navbar {
          background-color: #2b3832;
          color: white;
          padding: 15px;
          text-align: center;
        }

        .navbar h1 {
          margin: 0;
        }

        .content {
          padding: 20px;
        }

        .graph-container {
          margin: 20px 0;
          padding: 15px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .graph-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #2b3832;
        }

        .graph {
          margin-top: 20px;
        }

        .graph canvas {
          max-width: 100%;
        }

        .footer {
          background-color: #2b3832;
          color: white;
          padding: 10px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .graph-container {
            padding: 10px;
          }

          .graph-header h2 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DevicesAnalysis;
