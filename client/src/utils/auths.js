
/** 
 * @aat
 * started 02/10/2020
 */
import axios from 'axios';
import { VERSION_PATH, CMS_PRE_SIGN, SOMEVARFORAPPS } from './API'
const CryptoJS = require("crypto-js"); 
 

function issuePublicToken(info) {   
    var tokenInfo = CryptoJS.AES.encrypt(JSON.stringify(info), SOMEVARFORAPPS); 
    return new Buffer(tokenInfo.toString()).toString('base64');
}

export function preSign(params, dispatch, cb) {   
    axios.post(`${VERSION_PATH}/${CMS_PRE_SIGN}`, { ...params, info: issuePublicToken(params.info) })
      .then(response => { 
        cb(response)
      })
      .catch((error) => {
        // console.log("error ?", error) 
        cb(error.response) 
  })  
}