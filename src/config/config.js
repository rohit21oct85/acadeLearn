import axios from 'axios';

let apiUrl='';
let imageUrl='';
let baseUrl = '';
let server_type = '';

if(process.env.NODE_ENV === 'development'){
    console.log("development")
    apiUrl = process.env.REACT_APP_LOCAL_API_URL ;
    imageUrl = process.env.REACT_APP_LOCAL_API_URL_IMAGE;
    baseUrl = "example.com:3000";
    server_type = "http";
}else{
    console.log("production")
    apiUrl = process.env.REACT_APP_LIVE_API_URL;
    imageUrl = process.env.REACT_APP_LIVE_API_URL_IMAGE;
    baseUrl = "acadelearn.com";
    server_type = "https";
    // uncomment when service worker is done on production
    //this is just to check 
    // baseUrl = "example.com:5000";
    // server_type = "http";
}

const config = {
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
    },
};

const authAxios = axios.create(config);

authAxios.interceptors.request.use(function(config) {
    config.headers.Authorization = localStorage.getItem('access_token') ?
        `Bearer ${localStorage.getItem('access_token')}` :
        ``;
    return config;
});

export { baseUrl, apiUrl, imageUrl, server_type, authAxios, };