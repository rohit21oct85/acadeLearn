import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useUnitTestList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const key =  `student-report-${params.test_id}`
    const subject_id = localStorage.getItem('subject_id')
    const school_id = localStorage.getItem('school_id')
    return useQuery(key, async () => {
        if(state.access_token ){
            if(params.test_id){
                const result = await axios.get(`${apiUrl}v1/web/get-student-wise-report/${school_id}/${params.class_id}/${subject_id}/${params.test_id}`,{
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization':'Bearer '+ state.access_token
                    }
                });
                return result.data.data; 
            } 
        }
    },{enabled:!!subject_id});
}
