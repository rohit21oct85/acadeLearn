import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl} from '../../../config/config';
import {AuthContext} from '../../../context/AuthContext';

export default function useCreateModule(id) {
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const params = useParams();
      const location = useLocation();
    //   const path = `/student/student-agreement/${id}`
      const history = useHistory();
      
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }
      const class_id = params.class_id;
      const subject_id = params.subject_id;
      const school_id = localStorage.getItem('school_id');
      const user_id = localStorage.getItem('user_id')
      const name = localStorage.getItem('name')
      return useMutation(id => {
                  return axios.post(`${apiUrl}v1/web/attempt-test`, {id:id, user_id:user_id,class_id:class_id,subject_id:subject_id,school_id:school_id,name:name}, options)
            },{
            onSuccess: () => {
                queryClient.invalidateQueries('attempt-test')
                // history.push(`/student/student-agreement/${id}`);
            },
            onError: () => {
            },
      });
}
