import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const Alert = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handler}
      fullWidth={true}
      maxWidth='xs'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title' style={{ color: 'red' }}>
        {props.message}
      </DialogTitle>
      <DialogActions>
        <Button onClick={props.handler} autoFocus>
          Got it
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
