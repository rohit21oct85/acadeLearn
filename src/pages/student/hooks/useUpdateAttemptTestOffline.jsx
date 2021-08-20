import React, { useContext, useState } from 'react'
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import {apiUrl} from '../../../config/config';
import {AuthContext} from '../../../context/AuthContext';

export default function useUpdateAttemptTest(formDataOffline) {
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
	// const subject_id = params?.subject_id
	const school_id = localStorage.getItem('school_id')
	const student_id = localStorage.getItem('user_id')
	const attempt_id = params?.attempt_id
	return useMutation(formDataOffline => {
			return axios.patch(`${apiUrl}v1/web/save-answer-offline/${params.test_id}/${params.test_type}`,{school_id:school_id,student_id:student_id, data:formDataOffline})
		},{
		onSuccess: (data) => {
				queryClient.invalidateQueries('single-question')
				queryClient.invalidateQueries('question-list')
				queryClient.invalidateQueries(`result-${attempt_id}`)
				//history.push('/admin/app-module');
				return data.data
		},
		onError: () => {
		},
	});
}
