//#region Original Code
// import React from "react";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";
// import PackagePage from "./PackagePage";
// import ContactPage from "./ContactPage";
// import NavBar4 from "../../Components/NavBar4";
// import AboutPage from "./AboutPage";
// import EnginePage from "./EnginePage";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// function LandingPage() {
//   const navigate = useNavigate();

//   const backgroundStyle = {
//     backgroundImage: "url(/Images/Landingpage.png)",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     width: "100%",
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     overflowX: "hidden",
//   };

//   const navigateToPage = (path) => {
//     navigate(path);
//   };

//   return (
//     <div style={backgroundStyle}>
//       <NavBar4 />
//       <div id="home" className="home">
//         <Box sx={{ flexGrow: 1, padding: {xs:"10px",sm:"50px",md:"50px"}, textAlign: "left" }}>
//           <Box
//             sx={{
//               marginTop: "70px",
//               display: "flex",
//               alignItems: "left",
//               justifyContent: "left",
//               flexWrap: "wrap",
//             }}
//           >
//             <img
//               className="responsive-img"
//               src="/Images/logo.png"
//               alt="Fazenda Project"
//             />
//             <img
//               className="responsive-img"
//               src="/Images/sltlogo.png"
//               alt="The EMBRYO Innovation Center"
//             />

//             <style jsx>
//               {`
//                 .responsive-img {
//                   height: auto;
//                   max-height: 150px;
//                   width: auto;
//                   max-width: 100%;
//                   margin-left: 25px;
//                 }

//                 @media (max-width: 768px) {
//                   .responsive-img {
//                     max-height: 100px; /* adjust as needed for smaller screens */
//                     margin-left: 10px;
//                   }
//                 }

//                 @media (max-width: 480px) {
//                   .responsive-img {
//                     max-height: 75px; /* adjust as needed for smaller screens */
//                     margin-left: 5px;
//                   }
//                 }
//               `}
//             </style>
//           </Box>

//           <Box sx={{ maxWidth: "80%", margin: "20px" }}>
//             <Typography
//               variant="h2"
//               gutterBottom
//               sx={{
//                 mt: 7,
//                 fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem" },
//                 "@media (max-width: 600px)": { fontSize: "1.8rem" },
//                 letterSpacing: { xs: "0.01rem", sm: "0.05rem", md: "0.02rem" },
//                 wordSpacing: "0.3rem",
//               }}
//             >
//               Transform Your Farming with SLTMobitel Fazenda Smart Agro
//               Solutions
//             </Typography>
//             <Typography
//               variant="h6"
//               gutterBottom
//               sx={{
//                 mt: 3,
//                 fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
//               }}
//             >
//               Revolutionize your farm management with cutting-edge IoT
//               technology
//               <br />
//               for optimal productivity and efficiency.
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               flexGrow: 0,
//               marginTop: "50px",
//               marginLeft: "21px",
//               height: "20px",
//             }}
//           >
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#61B44A",
//                 color: "#fff",
//                 width: "200px", // Custom width
//                 height: "50px",
//                 "&:hover": {
//                   backgroundColor: "#4E7F41",
//                 },
//               }}
//               onClick={() => {
//                 document.getElementById("engine").scrollIntoView({
//                   behavior: "smooth",
//                   block: "start",
//                 });
//               }}
//             >
//               <Typography varient="h6">Explore More</Typography>
//               <ArrowForwardIcon />
//             </Button>
//           </Box>
//         </Box>

//         <Grid
//           container
//           spacing={4}
//           justifyContent="center"
//           sx={{
//             maxWidth: "90%",
//             margin: { xs: "6px", sm: "25px", md: "63px" },
//             marginTop: 10,
//             marginBottom: "30px",
//           }}
//         >
//           <Grid item xs={12} sm={4}>
//             <Box sx={{ textAlign: "center" }}>
//             <Box
//             component="img"
//             src="/Images/image_1.png"
//             alt="Image 1"
//             sx={{
//              width: "100%", height: {xs:"280px",sm:"150px",md:"350px"}, objectFit: "cover"
//             }}
//           />
              
//               <br />
//               <br />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 IOT Networks
//               </Typography>
//               <br />
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ textAlign: "justify" }}
//               >
//                 IoT smart farming solutions is a system that is built for
//                 monitoring the crop field with the help of sensors (light,
//                 humidity, temperature, soil moisture, crop health, rainfall
//                 etc.) and automating the irrigation system. The farmers can
//                 monitor the field conditions from anywhere. They can also select
//                 between manual and automated options for taking necessary
//                 actions based on this data.
//               </Typography>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Box sx={{ textAlign: "center" }}>

//             <Box
//             component="img"
//             src="/Images/image_2.png"
//             alt="Image 2"
//             sx={{
//              width: "100%", height: {xs:"280px",sm:"150px",md:"350px"}, objectFit: "cover"
//             }}
//           />

              
//               <br />
//               <br />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Artificial Intelligence
//               </Typography>
//               <br />
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ textAlign: "justify" }}
//               >
//                 Artificial Intelligence technology helps in detecting disease in
//                 plants, pests and poor nutrition of farms. AI sensors can detect
//                 and target weeds and then decide which herbicide to apply within
//                 the region. Artificial Intelligence in agriculture not only
//                 helps farmers to automate their farming but also shifts to
//                 precise cultivation for higher crop yield and better quality
//                 while using fewer resources.
//               </Typography>
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={4}>
//             <Box sx={{ textAlign: "center" }}>
//             <Box
//             component="img"
//             src="/Images/image_3.png"
//             alt="Image 3"
//             sx={{
//              width: "100%", height: {xs:"280px",sm:"150px",md:"350px"}, objectFit: "cover"
//             }}
//           />
              
//               <br />
//               <br />
//               <Typography variant="h6" fontWeight="bold" gutterBottom>
//                 Crop Analytics
//               </Typography>
//               <br />
//               <Typography
//                 variant="subtitle1"
//                 gutterBottom
//                 sx={{ textAlign: "justify" }}
//               >
//                 Organic farming is picking up in Sri Lanka with the
//                 establishment of new rules and regulations regarding fertilizer
//                 usage. Hence it has become vital to monitor agriculture and
//                 apply organic fertilizers as needed. For monitoring, a digital
//                 solution can be implemented, providing farmers with historical
//                 crop yield records and forecasts, reducing risk management.
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </div>

//       <div id="engine" className="engine">
//         <EnginePage />
//       </div>

//       <div id="product" className="package">
//         <PackagePage />
//       </div>

//       <div id="about" className="about">
//         <AboutPage />
//       </div>

//       <div id="contact" className="contact">
//         <ContactPage />
//       </div>
      
//     </div>
//   );
// }

// export default LandingPage;
//#endregion




import React from "react";
import { useNavigate } from "react-router-dom";
import PackagePage from "./PackagePage";
import ContactPage from "./ContactPage";
import NavBar4 from "../../Components/NavBar4";
import AboutPage from "./AboutPage";
import EnginePage from "./EnginePage";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function LandingPage() {
  const navigate = useNavigate();

  const navigateToPage = (path) => {
    navigate(path);
  };

  return (
    <div>
      <NavBar4 />

      <div id="home" className="home">
        <div className="header-container">
          <img className="logo" src="/Images/logo.png" alt="Fazenda Project" />
          <img className="logo" src="/Images/sltlogo.png" alt="The EMBRYO Innovation Center" />
        </div>

        <div className="text-container">
          <h1>Transform Your Farming with SLTMobitel Fazenda Smart Agro Solutions</h1>
          <p>Revolutionize your farm management with cutting-edge IoT Technology</p>
        </div>

        <div className="button-container">
          <button onClick={() => navigateToPage("#engine")} className="explore-button">
            <span>Explore More</span>
            {/* <ArrowForwardIcon /> */}
          </button>
        </div>
      </div>

      <div id="features" className="features">
        <div className="feature-item">
          <img src="/Images/image_1.png" alt="IOT Networks" />
          <h3>IOT Networks</h3>
          <p>
            IoT smart farming solutions is a system that is built for
            monitoring the crop field with the help of sensors (light, humidity, temperature, soil moisture, crop health, rainfall, etc.) and automating the irrigation system.
          </p>
        </div>

        <div className="feature-item">
          <img src="/Images/image_2.png" alt="Artificial Intelligence" />
          <h3>Artificial Intelligence</h3>
          <p>
            Artificial Intelligence technology helps in detecting disease in plants, pests, and poor nutrition of farms. AI sensors can detect and target weeds and then decide which herbicide to apply within the region.
          </p>
        </div>

        <div className="feature-item">
          <img src="/Images/image_3.png" alt="Crop Analytics" />
          <h3>Crop Analytics</h3>
          <p>
            Organic farming is picking up in Sri Lanka with the establishment of new rules and regulations regarding fertilizer usage.
          </p>
        </div>
      </div>

      <div id="engine" className="engine">
        <EnginePage />
      </div>
      <div id="product" className="package">
        <PackagePage />
      </div>
      <div id="about" className="about">
        <AboutPage />
      </div>
      <div id="contact" className="contact">
        <ContactPage />
      </div>

      <style>
        {`
          .home {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
          }

          .header-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }

          .logo {
            height: auto;
            max-height: 150px;
            width: auto;
            max-width: 100%;
            margin-left: 25px;
          }

          .text-container h1 {
            font-size: 2rem;
            color: #333;
            margin: 10px 0;
          }

          .text-container p {
            font-size: 1rem;
            color: #555;
            margin-bottom: 20px;
          }

          .button-container {
            margin-top: 20px;
          }

          .explore-button {
            display: inline-flex;
            align-items: center;
            background-color: #007BFF;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
          }

          .explore-button span {
            margin-right: 10px;
          }

          .features {
            display: flex;
            justify-content: space-around;
            margin: 50px 0;
            flex-wrap: wrap;
          }

          .feature-item {
            width: 30%;
            text-align: center;
            margin-bottom: 30px;
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .feature-item img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
          }

          .feature-item h3 {
            font-size: 1.5rem;
            color: #333;
            margin-top: 10px;
          }

          .feature-item p {
            font-size: 1rem;
            color: #555;
            margin-top: 10px;
          }

          @media (max-width: 768px) {
            .logo {
              max-height: 100px;
              margin-left: 10px;
            }

            .features {
              flex-direction: column;
              align-items: center;
            }

            .feature-item {
              width: 80%;
            }
          }

          @media (max-width: 480px) {
            .logo {
              max-height: 75px;
              margin-left: 5px;
            }

            .explore-button {
              font-size: 14px;
              padding: 8px 15px;
            }
          }
        `}
      </style>
      
    </div>
  );
}

export default LandingPage;

