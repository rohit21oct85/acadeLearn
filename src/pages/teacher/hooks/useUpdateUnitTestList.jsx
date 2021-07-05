import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import {apiUrl, authAxios} from '../../../config/config'
import {AuthContext} from '../../../context/AuthContext';

export default function useUpdateUnitTestList(formData) {
      const params = useParams();
      const queryClient = useQueryClient()
      const class_id = params.class_id
      const {state} = useContext(AuthContext);
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }      
      const status =  useMutation((formData) => {
            return authAxios.put(`${apiUrl}v1/web/update-assigned-test/${class_id}/${formData.id}`, formData, options);
            // return axios.patch(`${API_URL}v1/principal/update/${principal_id}`, formData, options)
        },{
        onSuccess: () => {
            const key = params.class_id ? `unit-tests-${params.class_id}` : `unit-tests`
            queryClient.invalidateQueries(key)
        },
        onError:(err)=>{
            return err.response.status
        }
        });
      return status;
}
