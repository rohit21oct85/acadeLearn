import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl} from '../../../config/config' 

export default function useAnsweredQuestions() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const class_id = params?.class_id
    return useQuery(`subjects-${class_id}`, async () => {
        if(state?.access_token && class_id!== undefined){
            const result = await axios.get(`${apiUrl}v1/web/get-subjects/${class_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            return result.data.data; 
        }
    });
    
}
