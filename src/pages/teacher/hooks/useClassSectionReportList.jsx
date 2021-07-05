
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useClassSectionReportList() {
    const {state } = useContext(AuthContext);
    const params = useParams();

    const school_id = localStorage.getItem('school_id');
    const class_id = params.class_id;
    const class_name = params.class_name;
    const section = params.section;
    return useQuery(`classes-section-report-${class_id}`, async () => {
        if(state.access_token && class_id != undefined){
            const result = await axios.get(`${apiUrl}v1/web/get-class-sections-students/${school_id}/${class_id}/${class_name}/${section}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
