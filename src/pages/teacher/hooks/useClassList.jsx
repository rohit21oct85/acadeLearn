
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import  {apiUrl} from '../../../config/config' 

export default function useClassList() {
    const {state } = useContext(AuthContext);

    return useQuery('classes', async () => {
        if(state.access_token ){
            const result = await axios.get(`${apiUrl}v1/web/get-all-classes`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+ state.access_token
                }
            });
            return result.data.data; 
        }
    });
}
