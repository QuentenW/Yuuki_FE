import { AppBar, Toolbar, Typography, Box } from "@mui/material";

import logo from "./assets/logo.png";

function App() {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* Circular Image */}
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            {/* Title */}
            <Typography variant="h6" component="div">
              Yuuki
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default App;
