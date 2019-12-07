import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import { withStyles } from '@material-ui/styles';

import useStyles from '../styles/style';

import AuthService from './../components/AuthService';
import API from './../utils/API';

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = { companies: [], CompanyId: '' };
  }

  componentDidMount() {
    API.getCompanies()
      .then(res => this.setState({ companies: res.data }))
      .catch(err => console.log(err.response.data.message));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const user = { ...this.state };
    delete user.companies;

    API.signUpUser(user)
      .then(res => this.props.history.replace('/login'))
      .catch(err => console.log(err.response.data.message));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;

    if (this.Auth.loggedIn()) return <Redirect to='/' />;

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Box display='flex' justifyContent='center' mt={3}>
            <Avatar className={classes.avatar}>
              <LocalDiningIcon />
            </Avatar>
          </Box>
          <Box display='flex' justifyContent='center'>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
          </Box>
          <form className={classes.form} onSubmit={this.handleFormSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
              autoComplete='given-name'
              onChange={this.handleChange}
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoComplete='family-name'
              onChange={this.handleChange}
            />

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={this.handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='pwd'
              autoComplete='current-password'
              onChange={this.handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              select
              fullWidth
              id='companyId'
              label='Company'
              name='CompanyId'
              value={this.state.CompanyId}
              onChange={this.handleChange}
            >
              <MenuItem value={0}>None</MenuItem>
              {this.state.companies.map(company => (
                <MenuItem key={company.id} value={company.id}>
                  {company.companyName}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <Link href='/login' variant='body2'>
            {'Have an account? Log In'}
          </Link>
        </div>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Signup);
