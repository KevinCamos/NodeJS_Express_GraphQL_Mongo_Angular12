//importamos fetch
const fetch = require("node-fetch");
const { Headers } = require('node-fetch');

// import fetch from 'node-fetch';
// import {Headers} from 'node-fetch';

exports.get_user_token = async (token) =>{
    return fetch('http://0.0.0.0:4000/api/user-token-gql', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': 'Token '+token, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
      }).then(response => response.json())
      .then(data => {
  console.log(data)
          return data;
      });

}