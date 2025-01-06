import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

function App() {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Robotic Arm Project
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ textAlign: "center", padding: "4rem 2rem" }}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Robotic Arm Project
        </Typography>
        <Typography variant="body1" gutterBottom>
          Simplifying automation with user-friendly technology.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Container>
    </Box>
  );
}

export default App;
