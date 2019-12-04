import React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import MenuItem from '../components/MenuItem';

const menuItems = [
  {
    icon: <DashboardIcon />,
    text: 'Dashboard',
    link: '/login'
  },
  {
    icon: <ShoppingCartIcon />,
    text: 'Orders',
    link: '/login'
  },
  {
    icon: <PeopleIcon />,
    text: 'Customers',
    link: '/login'
  },
  {
    icon: <BarChartIcon />,
    text: 'Reports',
    link: '/login'
  },
  {
    icon: <LayersIcon />,
    text: 'Integrations',
    link: '/login'
  }
];

const secondaryItems = [
  {
    icon: <AssignmentIcon />,
    text: 'Current month',
    link: '/login'
  },
  {
    icon: <AssignmentIcon />,
    text: 'Last quarter',
    link: '/login'
  },
  {
    icon: <AssignmentIcon />,
    text: 'Year-end sale',
    link: '/login'
  }
];

export const mainListItems = (
  <List>
    {menuItems.map(item => (
      <MenuItem key={item.text} item={item} />
    ))}
  </List>
);

export const secondaryListItems = (
  <List>
    <ListSubheader inset>Saved reports</ListSubheader>
    {secondaryItems.map(item => (
      <MenuItem key={item.text} item={item} />
    ))}
  </List>
);
