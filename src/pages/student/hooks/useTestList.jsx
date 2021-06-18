import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl} from '../../../config/config' 

export default function useTestList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const subject_id = params?.subject_id
    const school_id = localStorage.getItem('school_id')
    return useQuery(`assigned-tests-${subject_id}`, async () => {
        if(state?.access_token && subject_id !== undefined){
            const result = await axios.get(`${apiUrl}v1/web/get-assigned-tests/${school_id}/${params.class_id}/${subject_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            return result.data.data; 
        }
    });
    
}
