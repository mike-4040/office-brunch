import React from 'react';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function MenuItem({ item }) {
  return (
    <Link href={item.link}>
      <ListItem button>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    </Link>
  );
}
