
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 

export default function useClassWiseList() {
    const {state } = useContext(AuthContext);
    const school_id = localStorage.getItem('school_id');
    const teacher_id = localStorage.getItem('user_id');
    return useQuery(`classes-teacher-${teacher_id}`, async () => {
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
