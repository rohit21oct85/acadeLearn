import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl, authAxios} from '../../../config/config'
import {AuthContext} from '../../../context/AuthContext';

export default function useUpdateUnitTestList(id) {
      const params = useParams();
      const location = useLocation();
      const path = location.pathname;
      const history = useHistory();
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }      
      const status =  useMutation((id) => {
            return authAxios.put(`${apiUrl}v1/web/update-assigned-test/${id}`,options);
            // return axios.patch(`${API_URL}v1/principal/update/${principal_id}`, formData, options)
        },{
        onSuccess: () => {
            const key = params.class_id ? `unit-tests-${params.class_id}` : `unit-tests`
            queryClient.invalidateQueries(key)
        }
        });
      return status;
}
