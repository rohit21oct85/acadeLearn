let server_type= process.env.SERVER_TYPE;

let apiUrl='';
let baseUrl = '';
if(process.env.NODE_ENV === 'development'){
    apiUrl = process.env.REACT_APP_LOCAL_API_URL ;
    baseUrl = "example.com:3000"
}else{
    apiUrl = process.env.REACT_APP_LIVE_API_URL;
    baseUrl = "acadelearn.com"
}


export { baseUrl, apiUrl, server_type };