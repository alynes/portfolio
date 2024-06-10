import React from 'react';

import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75vw',
  maxWidth: '100vmin',
  maxHeight: '75vh',
  bgcolor: 'var(--bg-color)',
  // #22285af0
  color: 'white',
  borderRadius: '16px',
  outline: 'none',
  boxShadow: 24,
  p: 4,

  pointerEvents: 'all',
  overflow: 'auto',
  zIndex: 10000
};

export default function BasicModal(props) {

  return (
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        border='none'
      >
        <Fade in={props.open} timeout={props.timeout}>
            <div className='Absolute-full No-select'>
                <Box sx={style}>
                    <div className={'Absolute-full Flex-center'} style={{right: 0, top: 0, width: '50px', height: '50px'}}
                        onClick={() => {props.handleClose()}}
                    >
                        <CloseIcon style={{fontSize: '2rem'}} />

                    </div>
                    {props.children}
                </Box>
            </div>
        </Fade>
            
      </Modal>
  );
}