import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";

const HomePage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden", // Prevents horizontal scrolling
      }}
    >
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Robotic Arm Project
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "4rem 2rem",
          backgroundColor: "#f5f5f5",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Robotic Arm Project
        </Typography>
        <Typography variant="body1" gutterBottom>
          Your gateway to innovative automation solutions.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          onClick={() => alert("Redirecting to features...")}
        >
          Explore Features
        </Button>
      </Box>

      {/* About Section */}
      <Box
        sx={{ padding: "4rem 2rem", width: "100%", boxSizing: "border-box" }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            About the Project
          </Typography>
          <Typography variant="body1">
            Our goal is to make robotic arms accessible to everyone...
          </Typography>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
          width: "100%",
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Robotic Arm Project
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
