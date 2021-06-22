import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl, authAxios} from '../../../config/config' 

export default function useFetchResult() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const attempt_id = params.attempt_id;
    return useQuery(`result-${attempt_id}`, async () => {
        if(state?.access_token && attempt_id){
            const result = await authAxios.get(`${apiUrl}v1/web/get-result/${attempt_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            return result.data.data; 
        }
    });
    
}
