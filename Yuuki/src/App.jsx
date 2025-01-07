import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import logo from "./assets/logo.png"; // Replace with your image path
import background from "./assets/background.jpg"; // Replace with your background image path

function App() {
  const [files, setFiles] = useState([]); // State to store uploaded files
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file to download
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for toast visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for toast message

  // Handle File Upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prevFiles) => [...prevFiles, file]);
      setSnackbarMessage(`File "${file.name}" uploaded successfully!`);
      setSnackbarOpen(true); // Show the toast
    }
  };

  // Handle File Selection for Download
  const handleSelect = (event) => {
    const fileName = event.target.value;
    const file = files.find((f) => f.name === fileName);
    setSelectedFile(file);
  };

  // Handle File Download
  const handleDownload = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = selectedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the URL
    }
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // Ensures the root container spans the full viewport height
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          width: "80%",
          minHeight: "85vh",
          maxWidth: "900px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // White background with transparency
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {/* Navigation Bar */}
        <AppBar position="static" sx={{ borderRadius: "8px" }}>
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

        {/* Upload Section */}
        <Box sx={{ margin: "2rem 0" }}>
          <Typography variant="h5" gutterBottom>
            Upload File
          </Typography>
          <Button variant="contained" component="label" color="primary">
            Upload
            <input type="file" hidden onChange={handleUpload} />
          </Button>
        </Box>

        {/* Download Section */}
        <Box sx={{ margin: "2rem 0" }}>
          <Typography variant="h5" gutterBottom>
            Download File
          </Typography>
          <TextField
            select
            label="Select File"
            value={selectedFile?.name || ""}
            onChange={handleSelect}
            sx={{ width: "300px", marginBottom: "1rem" }}
          >
            {files.map((file) => (
              <MenuItem key={file.name} value={file.name}>
                {file.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownload}
            disabled={!selectedFile}
          >
            Download
          </Button>
        </Box>

        {/* Snackbar for Upload Success */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default App;
