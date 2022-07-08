import React from "react";
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

// These Components utilize the Snackbar component in Material-UI
// A small alert will apear when the useState is set to true

export const EditSuccess = () => {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Snackbar 
        open={checked}
        autoHideDuration={3000}
        onClose={() => {
          if (checked) {
            setChecked(false);
          }
          window.location.reload();
        }}
        anchorOrigin= {{vertical: "top", horizontal: "center"}}
        message="Successfully changed flight information!">
        <Alert severity="success" sx={{ width: '100%'}}>
          Successfully changed flight information!
        </Alert>
      </Snackbar>
    </>
  );

}

export const DeleteSuccess = () => {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <Snackbar
        open={checked}
        autoHideDuration={3000}
        onClose={() => {
          if (checked) {
            setChecked(false);
          }
          window.location.reload();
        }}
        anchorOrigin= {{vertical: "top", horizontal: "center"}}
        message="Flight has been successfully deleted!">
        <Alert severity="success" sx={{ width: '100%' }}>
          Flight has been successfully deleted!
        </Alert>
      </Snackbar>
    </>
  );

}
