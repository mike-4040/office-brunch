import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import useStyles from '../styles/style';

import AuthService from './../components/AuthService';
import API from './../utils/API';

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentDidMount() { 
    API.getCompanies()
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data.message));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.username, this.state.email, this.state.password)
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

    if (this.Auth.loggedIn())
      return <Redirect to='/' />;
    
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Signup
          </Typography>

          <form className={classes.form} onSubmit={this.handleFormSubmit}>
            <InputLabel shrink id='companyLabel' variant='filled'>
              Company
            </InputLabel>
            <Select
              variant='outlined'
              margin='normal'
              fullWidth
              labelId='companyLabel'
              id='company'
              name='companyId'
              onChange={this.handleChange}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
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
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
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
