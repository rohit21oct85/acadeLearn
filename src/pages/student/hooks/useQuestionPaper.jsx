import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl, authAxios} from '../../../config/config' 

export default function useQuestionPaper() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const school_id = localStorage.getItem('school_id');
    const student_id = localStorage.getItem('user_id');
    const attempt_id = localStorage.getItem('attemptIdUploadTest')
    return useQuery(`upload-test`, async () => {
        if(state?.access_token && params.test_type == "upload-test"){
            const result = await authAxios.get(`${apiUrl}v1/web/get-uploaded-test-paper/${attempt_id}/${params.test_type}`,{school_id:school_id,student_id:student_id},{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            return result.data.data; 
        }
    });
    
}
