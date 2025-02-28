import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MuiAlert from '@mui/material/Alert';
const severityColors = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  info: 'blue',
};

function CustomAlert({ message, severity, open, onClose }) {
  const backgroundColor = severityColors[severity] || 'defaultColor';
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      
      autoHideDuration={3000}
      onClose={onClose}
    >
    <MuiAlert
        onClose={onClose}
        severity={severity}
        sx={{
          width: '100%',
          fontSize: '1.3rem',
          backgroundColor: backgroundColor, // Dynamically set background color
          color: 'white',
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default CustomAlert;
