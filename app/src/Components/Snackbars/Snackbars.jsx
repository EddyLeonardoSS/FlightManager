import React from "react";
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

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
