import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import logo from 'logo.png';
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const backgroundColor = theme.palette.background.alt;

  return (
    <Box>
      <Box width="100%" backgroundColor={backgroundColor} p="1rem 6%" textAlign="center">
      <img src={logo}  height={'60px'} onClick={() => Navigate("/home")} style={{cursor: "pointer"}}/>

      </Box>

      <Box width={isNonMobileScreens ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" backgroundColor={backgroundColor}>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Connect, Find Ur Friends and Family Members!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
