
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 
import {useParams} from 'react-router-dom'

export default function useUnitTestList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const key = params.school_id  && params.class_id ? `unit-tests-${params.school_id}-${params.class_id}` : `unit-tests`
    const subject_id = localStorage.getItem('subject_id')
    console.log(params.school_id, params.class_id,subject_id)
    return useQuery(key, async () => {
        if(state.access_token ){
            if(params.school_id && params.class_id){
                const result = await axios.get(`${apiUrl}v1/web/get-all-unit-tests/${params.school_id}/${params.class_id}/${subject_id}`,{
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization':'Bearer '+ state.access_token
                    }
                });
                return result.data.data; 
            }   
        }
    });
}
