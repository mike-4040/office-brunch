import axios from 'axios';
export default {
  // Gets a single user by id
  getUser: id => axios.get(`/api/user/${id}`),

  signUpUser: user => axios.post('api/signup', user),

  // Get a list of all active companies, unprotected
  getOrgs: () => axios.get('/api/org'),

  users: () => axios.get('/api/user')
};



/** 
 * @aat
 * started 02/10/2020
 */
export const VERSION_PATH = '/api/v1'
export const CMS_PRE_SIGN = 'presign'
export const SOMEVARFORAPPS = 'Pooljlklad!12#,asduqeqw78123(*98213adm,9812'
 