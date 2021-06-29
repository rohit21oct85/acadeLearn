import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl, authAxios} from '../../../config/config' 

export default function useRandomQuestion() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const test_id = params?.test_id
    // const subject_id = params?.subject_id
    const school_id = localStorage.getItem('school_id')
    const student_id = localStorage.getItem('user_id')
    const options = {
        headers: {
              'Content-Type': 'Application/json',
              'Authorization':'Bearer '+state.access_token
        }
    }
    return useQuery(`single-question`, async () => {
        if(state?.access_token){
            const result = await authAxios.post(`${apiUrl}v1/web/get-question/${params.test_id}`,{school_id:school_id,student_id:student_id});
            return result.data; 
        }
    });
    
}
