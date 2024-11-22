//#region Original Code
// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";

// const EnginePage = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         padding: "10px",
//         display: "flex",
//         margin: {xs:"30px",sm:"60px",md:"auto"},
//         justifyContent: "center",
//         width: {xs:"80%",sm:"83%",md:"70%"},
//         alignItems: "center",
//         borderRadius: "20px",
//       }}
//     >
//       <Grid
//         container
//         spacing={0}
//         sx={{
//           maxWidth: {xs:"90%",sm:"90%"},
//           display: "flex",
//           alignItems: "center",
//           marginTop: {xs:"20px",sm:"60px"},
//           marginBottom: "60px",
//         }}
//       >
//         {/* Item 1 */}
//         <Grid item xs={12} sm={6}>
//           <Box sx={{ textAlign: "center" }}>
//             <Box
//               component="img"
//               src="/Images/image_7.png"
//               alt="Image 1"
//               sx={{
//                 width: "95%",
//                 height: {
//                   xs: "200px", // 100px for extra small screens
//                   sm: "280px", // 200px for small and tablet screens
//                   md: "300px",
//                   // 300px for medium and larger screens
//                 },
//                 borderRadius: "15px",
//                 display: "block",
//               }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Box sx={{ width: "95%", margin: "auto" }}>
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               textAlign="center"
//               gutterBottom
//             >
//               Fazenda Real-time monitoring Engine
//             </Typography>
//             <Typography variant="subtitle1" textAlign="justify" gutterBottom>
//               Stay ahead with real-time monitoring of crucial farm conditions
//               such as air temperature, humidity, rainfall, and soil parameters.
//               SLT-Mobitel's Fazenda Real Time Engine ensures you have up-to-date
//               data at your fingertips, allowing you to make informed decisions
//               swiftly.
//             </Typography>
//           </Box>
//         </Grid>

//         {/* Item 2 */}
//         <Grid item xs={12} sm={6}>
//           <Box
//             sx={{
//               width: "95%",
//               margin: "auto",
//               marginTop: "20px",
//             }}
//           >
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               gutterBottom
//               align="right"
//               textAlign="center"
//             >
//               Fazenda Alerting Engine
//             </Typography>
//             <Typography variant="subtitle1" textAlign="justify" gutterBottom>
//               Set customizable thresholds for optimal farming conditions and
//               receive instant SMS alerts if they are breached. The Fazenda
//               Alerting Engine keeps you informed, ensuring your farm always
//               operates under the best conditions for your crops.
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Box
//             component="img"
//             src="/Images/image_6.png"
//             alt="Image 2"
//             sx={{
//               width: "95%",
//               height: {
//                 xs: "180px", // 100px for extra small screens
//                 sm: "220px", // 200px for small and tablet screens
//                 md: "300px",
//                 // 300px for medium and larger screens
//               },
//               borderRadius: "15px",
//               marginTop: "10px",
//               display: "block",
//             }}
//           />
//         </Grid>

//         {/* Item 3 */}
//         <Grid item xs={12} sm={6}>
//         <Box
//             component="img"
//             src="/Images/image_5.png"
//             alt="Image 3"
//             sx={{
//               width: "95%",
//               height: {
//                 xs: "180px", // 100px for extra small screens
//                 sm: "220px", // 200px for small and tablet screens
//                 md: "300px",
//                 // 300px for medium and larger screens
//               },
//               borderRadius: "15px",
//               marginTop: "10px",
//               display: "block",
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Box
//             sx={{
//               width: "95%",
//               margin: "auto",
//               marginTop: "20px",
//             }}
//           >
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               textAlign="center"
//               gutterBottom
//             >
//               Fazenda Analysis Engine
//             </Typography>
//             <Typography variant="subtitle1" textAlign="justify" gutterBottom>
//               The Fazenda Analysis Engine predicts future farm conditions for
//               the next 24 hours for every parameter. Receive warnings if future
//               conditions are likely to violate set thresholds, allowing you to
//               take proactive measures to maintain ideal conditions.
//             </Typography>
//           </Box>
//         </Grid>

//         {/* Item 4 */}
//         <Grid item xs={12} sm={6}>
//           <Box
//             sx={{
//               width: "95%",
//               margin: "auto",
//               marginTop: "20px",
//             }}
//           >
//             <Typography
//               variant="h6"
//               fontWeight="bold"
//               gutterBottom
//               align="right"
//               textAlign="center"
//             >
//               Fazenda Yield Engine
//             </Typography>
//             <Typography variant="subtitle1" textAlign="justify" gutterBottom>
//               Effortlessly track yield data and unit prices with the Fazenda
//               Yield Engine. Calculate revenue automatically and maintain digital
//               records for future reference. Empower your farming with data
//               driven insights and boost your profitability.
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//         <Box
//             component="img"
//             src="/Images/image_4.png"
//             alt="Image 4"
//             sx={{
//               width: "95%",
//               height: {
//                 xs: "180px", // 100px for extra small screens
//                 sm: "220px", // 200px for small and tablet screens
//                 md: "300px",
//                 // 300px for medium and larger screens
//               },
//               borderRadius: "15px",
//               marginTop: "10px",
//               display: "block",
//             }}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default EnginePage;
//#endregion


import React from "react";

const EnginePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        {/* Item 1 */}
        <div style={styles.imageContainer}>
          <img src="/Images/image_7.png" alt="Image 1" style={styles.image} />
        </div>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>Fazenda Real-time Monitoring Engine</h2>
          <p style={styles.text}>
            Stay ahead with real-time monitoring of crucial farm conditions
            such as air temperature, humidity, rainfall, and soil parameters.
            SLT-Mobitel's Fazenda Real Time Engine ensures you have up-to-date
            data at your fingertips, allowing you to make informed decisions
            swiftly.
          </p>
        </div>
      </div>

      <div style={styles.row}>
        {/* Item 2 */}
        <div style={styles.textContainer}>
          <h2 style={styles.title}>Fazenda Alerting Engine</h2>
          <p style={styles.text}>
            Set customizable thresholds for optimal farming conditions and
            receive instant SMS alerts if they are breached. The Fazenda
            Alerting Engine keeps you informed, ensuring your farm always
            operates under the best conditions for your crops.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img src="/Images/image_6.png" alt="Image 2" style={styles.image} />
        </div>
      </div>

      <div style={styles.row}>
        {/* Item 3 */}
        <div style={styles.imageContainer}>
          <img src="/Images/image_5.png" alt="Image 3" style={styles.image} />
        </div>
        <div style={styles.textContainer}>
          <h2 style={styles.title}>Fazenda Analysis Engine</h2>
          <p style={styles.text}>
            The Fazenda Analysis Engine predicts future farm conditions for
            the next 24 hours for every parameter. Receive warnings if future
            conditions are likely to violate set thresholds, allowing you to
            take proactive measures to maintain ideal conditions.
          </p>
        </div>
      </div>

      <div style={styles.row}>
        {/* Item 4 */}
        <div style={styles.textContainer}>
          <h2 style={styles.title}>Fazenda Yield Engine</h2>
          <p style={styles.text}>
            Effortlessly track yield data and unit prices with the Fazenda
            Yield Engine. Calculate revenue automatically and maintain digital
            records for future reference. Empower your farming with data-driven
            insights and boost your profitability.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img src="/Images/image_4.png" alt="Image 4" style={styles.image} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  imageContainer: {
    flex: "1 1 45%",
    textAlign: "center",
    padding: "10px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  textContainer: {
    flex: "1 1 50%",
    padding: "10px",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
    textAlign: "justify",
  },
};

export default EnginePage;
