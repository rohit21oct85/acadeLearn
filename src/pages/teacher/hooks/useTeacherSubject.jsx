
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useTeacherSubjectList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const school_id = localStorage.getItem('school_id')
    return useQuery('teacher-subject', async () => {
        if(state.access_token ){
            const result = await axios.get(`${apiUrl}v1/web/get-teacher-subject/${state.user_id}/${school_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            localStorage.setItem('subject_name',result.data.data[0].subject_name);
            localStorage.setItem('subject_id',result.data.data[0].subject_id);
            return result.data.data; 
        }
    });
}
