import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl, authAxios} from '../../../config/config';
import {AuthContext} from '../../../context/AuthContext';

export default function useUpdateAttemptTestBackup(formData) {
	const queryClient = useQueryClient()
	const {state} = useContext(AuthContext);
	const params = useParams();
	const location = useLocation();
	const path = location.pathname;
	const history = useHistory();
	
	const test_id = params?.test_id
	const school_id = localStorage.getItem('school_id')
	const student_id = localStorage.getItem('user_id')
	const time_taken = localStorage.getItem('COUNTER_INCRE');

	return useMutation(formData => {
			return axios.patch(`${apiUrl}v1/web/save-answer/${params.test_id}/${params.test_type}`,{school_id:school_id,student_id:student_id, question_id:formData.question_id, answer:formData.answer,option:formData.option,time_taken:time_taken,completion_status:formData.completion_status},{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            })
		},{
		onSuccess: (data) => {
				queryClient.invalidateQueries('single-question')
				queryClient.invalidateQueries('question-list')
				//history.push('/admin/app-module');
				return data.data
		},
		onError: () => {
		},
	});
}
