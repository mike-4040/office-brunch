import React from 'react';
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useStyles from '../styles/dashboardStyle';
import { mainListItems, secondaryListItems } from './listItems';

export default function MyDrawer({ open, handleClose }) {
  
  const classes = useStyles();

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      {mainListItems}
      <Divider />
      {secondaryListItems}
    </Drawer>
  );
}
