import {useContext}  from 'react'
import{useParams} from 'react-router-dom'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext.jsx';
import  {apiUrl, authAxios} from '../../../config/config' 

export default function useCumulativeScore() {
    const {state } = useContext(AuthContext);
    const params = useParams();
    const class_id = params.class_id;
    const subject_id = params.subject_id;
    const student_id = localStorage.getItem('user_id')
    const school_id = localStorage.getItem('school_id')
    return useQuery(`cumulative-score-${class_id}-${subject_id}`, async () => {
        if(state?.access_token){
            const result = await axios.post(`${apiUrl}v1/web/get-cumulative-score/${subject_id}`,{class_id :class_id, student_id:student_id, school_id:school_id},{
                headers: {
                    'Content-Type': 'Application/json',
                    'Access-Control-Allow-Origin': "https://*.acadelearn.com",
                    'Authorization':'Bearer '+state.access_token
                }
            }
            );
            return result.data.data; 
        }
    });
    
}
