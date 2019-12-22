import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: id => axios.get(`/api/user/${id}`),

  signUpUser: user => axios.post('api/signup', user),

  // Get a list of all active companies, unprotected
  getCompanies: () => axios.get('/api/company'),

  users: () => axios.get('/api/users')
};
