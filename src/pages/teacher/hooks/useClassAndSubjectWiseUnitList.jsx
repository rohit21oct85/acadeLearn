
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 
import { useParams } from 'react-router-dom';

export default function ClassAndSubjectWiseUnitList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const subject_id = localStorage.getItem('subject_id');
    return useQuery(`units-${params.class_id}`, async () => {
        if(state.access_token && params.window == "tab0" && params.class_id){
            const result = await axios.get(`${apiUrl}v1/web/view-all-units/${params.class_id}/${subject_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
