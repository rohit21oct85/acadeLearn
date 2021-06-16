import axios from 'axios';

let apiUrl='';
let baseUrl = '';
let server_type = '';

if(process.env.NODE_ENV === 'development'){
    apiUrl = process.env.REACT_APP_LOCAL_API_URL ;
    baseUrl = "example.com:3000";
    server_type = "http";
}else{
    apiUrl = process.env.REACT_APP_LIVE_API_URL;
    baseUrl = "acadelearn.com";
    server_type = "https";
}

const config = {
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    },
};

const authAxios = axios.create(config);

authAxios.interceptors.request.use(function(config) {
    config.headers.Authorization = localStorage.getItem('access_token') ?
        `Bearer ${localStorage.getItem('access_token')}` :
        ``;
    return config;
});

export { baseUrl, apiUrl, server_type, authAxios, };