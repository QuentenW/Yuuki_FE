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
import JSZip from "jszip";
import logo from "./assets/logo.png"; // Replace with your image path
import background from "./assets/background.jpg"; // Replace with your background image path

function App() {
  const [files, setFiles] = useState([]); // State to store uploaded files
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file to download
  const [description, setDescription] = useState(""); // State for the description
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for toast visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for toast message

  // Handle File Upload
  const handleUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (uploadedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      setSnackbarMessage(`${uploadedFiles.length} file(s) uploaded successfully!`);
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

  // Handle Description Change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Create ZIP File
  const createZip = async () => {
    if (files.length === 0 || !description.trim()) {
      setSnackbarMessage("Please upload MP4 files and add a description.");
      setSnackbarOpen(true);
      return;
    }

    const zip = new JSZip();
    const textFileName = "description.txt";

    // Add MP4 files to the zip
    files.forEach((file) => {
      zip.file(file.name, file);
    });

    // Add the description as a text file
    zip.file(textFileName, description);

    // Generate the zip file and trigger download
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipBlob);

    const link = document.createElement("a");
    link.href = zipUrl;
    link.download = "files_and_description.zip";
    link.click();

    URL.revokeObjectURL(zipUrl); // Clean up
    setSnackbarMessage("ZIP file created and downloaded!");
    setSnackbarOpen(true);
  };

  // Close Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
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
          backgroundColor: "rgba(255, 255, 255, 0.9)",
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
              <Typography variant="h6" component="div">
                Yuuki
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Upload Section */}
        <Box sx={{ margin: "2rem 0" }}>
          <Typography variant="h5" gutterBottom>
            Upload MP4 Files & Add Description
          </Typography>
          <Button variant="contained" component="label" color="primary" sx={{ marginBottom: "1rem" }}>
            Upload MP4 Files
            <input type="file" accept="video/mp4" multiple hidden onChange={handleUpload} />
          </Button>
          <TextField
            fullWidth
            label="Add a description"
            multiline
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          />
          <Button variant="contained" color="secondary" onClick={createZip}>
            Create & Download ZIP
          </Button>
        </Box>

        {/* Download Section */}
        <Box sx={{ margin: "2rem 0" }}>
          <Typography variant="h5" gutterBottom>
            Download Individual File
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

        {/* Snackbar for Notifications */}
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
