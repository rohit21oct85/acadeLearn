
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl, authAxios} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useClassList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    // const key = params.school_id ? `classes` : `classes`
    const school_id = localStorage.getItem('school_id');
    const teacher_id = localStorage.getItem('user_id');
    return useQuery(`classes-school-${teacher_id}`, async () => {
        if(state.access_token && school_id != undefined){
            const result = await axios.get(`${apiUrl}v1/web/classes-with-student-no/${school_id}/${teacher_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
