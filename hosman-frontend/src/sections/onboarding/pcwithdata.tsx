import { Box, Button, Typography } from "@mui/material";
import { LazyMotion, domAnimation, m } from "framer-motion";
import tv from "src/assets/onboardinggg.png";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";

const AnimatedPC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        mt: 10,
      }}
    >
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ scale: 0.2, opacity: 100 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "relative",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box component="img" src={tv} alt="TV" />
          </Box>

          {/* Animated Content Inside the Screen */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              transform: "translate(-50%, -50%)",
              width: "80%",
            }}
            
          >
            <Typography
              variant="h5"
              color="white"
              bgcolor={"rgba(0,0,0,0.5)"}
              sx={{ textShadow: "0px 2px 8px rgba(0,0,0,0.3)" }}
            >
              Welcome to the Healthcare Dashboard
            </Typography>
          </m.div>

          <m.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            style={{
              position: "absolute",
              top: "40%",
              left: "10%",
              transform: "translate(-50%, -50%)",
              width: "70%",
            }}
          >
            <Typography
              variant="body1"
              color="white"
              bgcolor={"rgba(0,0,0,0.5)"}
              sx={{ textShadow: "0px 2px 8px rgba(0,0,0,0.3)" }}
            >
              Track patients, schedule appointments, and more.
            </Typography>
          </m.div>
        </m.div>
      </LazyMotion>
      <Box sx={{
        position:"absolute",
        top:"56%"

      }}>
      <Button onClick={() => navigate(paths.dashboard.root)}>click</Button>
      </Box>
    </Box>
  );
};

export default AnimatedPC;
