import React from "react";
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const EditSuccess = props => {
  const [checked, setChecked] = useState(true);

  const navigate = useNavigate();
  return (
    <>
      <Snackbar
        open={checked}
        autoHideDuration={6000}
        onClose={() => {
          if (checked) {
            setChecked(false);
          }
          navigate(`/flights`);
        }}
        message="Successfully changed flight information!">
        <Alert severity="success" sx={{ width: '100%' }}>
          Successfully changed flight information!
        </Alert>
      </Snackbar>
    </>
  );

}