const baseUrl = "example.com:3000"

let server_type= process.env.SERVER_TYPE;

let apiUrl='';
if(process.env.NODE_ENV === 'development'){
    apiUrl = process.env.REACT_APP_LOCAL_API_URL ;
}else{
    apiUrl = process.env.REACT_APP_LIVE_API_URL;
}


export { baseUrl, apiUrl, server_type };