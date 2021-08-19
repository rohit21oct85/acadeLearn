import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl, authAxios} from '../../../config/config';
import {AuthContext} from '../../../context/AuthContext';

export default function useCreateModule(form) {
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const params = useParams();
      const history = useHistory();
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }
      const class_id = params.class_id;
      // const subject_id = params.subject_id;
      const school_id = localStorage.getItem('school_id');
      const user_id = localStorage.getItem('user_id')
      const name = localStorage.getItem('name')
      const section = localStorage.getItem('section')
      return useMutation(form => {
                  // console.log(form)
                  return axios.post(`${apiUrl}v1/web/attempt-test`, {id:form.id, user_id:user_id,class_id:class_id,school_id:school_id,name:name,assign_test_id:form.assign_test_id, section:section, test_type:form.test_type, mock_id:form.mock_id}, options)
            },{
            onSuccess: (data) => {
                  localStorage.setItem('attemptIdUploadTest',data.data.data._id)
                  queryClient.invalidateQueries('attempt-test')
                 
                  // history.push(`/student/student-agreement/${id}`);
            },
            onError: () => {
            },
      });
}
