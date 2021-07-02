
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl, authAxios} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useStudentAttemptedTests() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    // const key = params.school_id ? `classes` : `classes`
    const school_id = params.school_id;
    const teacher_id = params.teacher_id;
    const class_id = params.class_id;
    const test_id = params.test_id;
    return useQuery(`test-attempted-${test_id}`, async () => {
        if(state.access_token && teacher_id != undefined){
            const result = await axios.get(`${apiUrl}v1/web/get-all-student-attempted-tests/${school_id}/${class_id}/${test_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
