
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useTeacherSubjectList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const key = params.school_id ? `teacher-subject-${params.school_id}` : `teacher-subject`
    return useQuery(key, async () => {
        if(state.access_token ){
            const result = await axios.get(`${apiUrl}v1/web/get-teacher-subject/${state.user_id}/${params.school_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            // console.log(result.data.data[0].subject_id,result.data.data[0].subject_name)
            localStorage.setItem('subject_name',result.data.data[0].subject_name);
            localStorage.setItem('subject_id',result.data.data[0].subject_id);
            return result.data.data; 
        }
    });
}
