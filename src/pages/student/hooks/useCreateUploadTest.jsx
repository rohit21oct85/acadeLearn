import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl} from '../../../config/config';
import {AuthContext} from '../../../context/AuthContext';

export default function useCreateUploadTest(formData) {
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
	// const subject_id = params?.subject_id
	const school_id = localStorage.getItem('school_id')
	const student_id = localStorage.getItem('user_id')
	const attempt_id = localStorage.getItem('attemptIdUploadTest')

	return useMutation(formData => {
		// console.log(formData)
			return axios.patch(`${apiUrl}v1/web/save-answer-upload/${params.test_type}`,{school_id:school_id,student_id:student_id,answers:formData.answers,time_taken:localStorage.getItem('COUNTER'),completion_status:formData.completion_status,attempt_id:attempt_id})
		},{
		onSuccess: (data) => {
				//history.push('/admin/app-module');
				return data.data
		},
		onError: () => {
		},
	});
}
