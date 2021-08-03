
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 
import { useParams } from 'react-router-dom';

export default function ClassSubjectAndUnitWiseChapterList() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const subject_id = localStorage.getItem('subject_id');
    //test_id is unit_id here
    return useQuery(`chapters-${params.class_id}-${subject_id}`, async () => {
        if(state.access_token && params.window == "tab0" && params.class_id){
            const result = await axios.get(`${apiUrl}v1/web/view-all-chapters/${params.class_id}/${subject_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
