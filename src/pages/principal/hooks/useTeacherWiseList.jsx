
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
    const school_id = params.school_id;
    const subject_id = params.subject_id;
    return useQuery(`teachers-school-${school_id}-${subject_id}`, async () => {
        if(state.access_token && school_id != undefined){
            const result = await axios.post(`${apiUrl}v1/web/get-all-teachers/${school_id}`,{subject_id:subject_id},{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
