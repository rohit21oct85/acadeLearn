import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl} from '../../../config/config' 

export default function useUploadTest() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    // const subject_id = params?.subject_id
    // const class_id = params?.class_id
    const school_id = localStorage.getItem('school_id')
    const student_id = localStorage.getItem('user_id')
    const class_id = localStorage.getItem('class_id');
    return useQuery(`upload-test-${class_id}-${params.window}`, async () => {
        if(state?.access_token && class_id !== undefined && params.window =="tab1"){
            const result = await axios.get(`${apiUrl}v1/web/get-upload-test/${school_id}/${student_id}/${class_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            return result.data.data; 
        }
    });
    
}
