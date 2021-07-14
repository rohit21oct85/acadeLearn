import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl} from '../../../config/config' 

export default function useMockTest() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    // const subject_id = params?.subject_id
    // const class_id = params?.class_id
    const school_id = localStorage.getItem('school_id')
    const student_id = localStorage.getItem('user_id')
    return useQuery(`mock-tests-${student_id}`, async () => {
        if(state?.access_token && school_id !== undefined){
            const result = await axios.get(`${apiUrl}v1/web/get-mock-test/${school_id}/${student_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            return result.data.data; 
        }
    });
    
}
