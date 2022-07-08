import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { EditForm1, Form } from '../Form/Form';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';

// These Components use the BasicModal component from Material-UI.
// They simulate a popup in which the Forms are displayed

const style = {
  display: "flex",
  justifyContent: "center",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#E6E6FA',
  border: '2px solid #000',
  borderRadius: '23px',
  boxShadow: 24,
  p: 4,
};

const hoverSX = {
  '&:hover': {
      color: 'green'
  },
  
}
export const EditFlightModal = () =>{
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = async () => {
    setOpen(false);
   await window.location.reload();
};

  return (
    <div>
      <ModeEditOutlineOutlinedIcon sx={hoverSX} onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm1  />
        </Box>
      </Modal>
    </div>
  );
}

export const AddFlightModal = () =>{
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true)
  };
  
  const handleClose = async () => {
    setOpen(false);
   await window.location.reload();
};

  return (
    <div>
      <AddIcon sx={hoverSX} onClick={handleOpen}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form/>
        </Box>
      </Modal>
    </div>
  );
}
