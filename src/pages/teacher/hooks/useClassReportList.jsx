
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl, authAxios} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useClassReportList() {
    const {state } = useContext(AuthContext);
    const params = useParams();

    const school_id = localStorage.getItem('school_id');
    const class_id = params.class_id;
    const class_name = params.class_name;
    return useQuery(`classes-report-${class_id}`, async () => {
        if(state.access_token && class_id != undefined){
            const result = await axios.get(`${apiUrl}v1/web/get-sections-student-count/${school_id}/${class_id}/${class_name}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
