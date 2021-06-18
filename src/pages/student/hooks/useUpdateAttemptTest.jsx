import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl} from '../../../config/config';
import {AuthContext} from '../../../context/AuthContext';

export default function useUpdateAttemptTest(formData) {
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const params = useParams();
      const location = useLocation();
      const path = location.pathname;
      const history = useHistory();
      
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }

      const test_id = params?.test_id
      const subject_id = params?.subject_id
      const school_id = localStorage.getItem('school_id')
      const student_id = localStorage.getItem('user_id')

      return useMutation(formData => {
                  return axios.patch(`${apiUrl}v1/web/save-answer/${params.subject_id}/${params.test_id}`,{school_id:school_id,student_id:student_id, question_id:formData.question_id, answer:formData.answer,option:formData.option}, options)
            },{
            onSuccess: () => {
                  queryClient.invalidateQueries('single-question')
                  queryClient.invalidateQueries('question-list')
                //   history.push('/admin/app-module');
            },
            onError: () => {
            },
      });
}
