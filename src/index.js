import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './MainApp';
import SubDomainApp from './SubDomainApp';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import AuthProvider from './context/AuthContext';
import { ToastProvider } from 'react-toast-notifications';

import { QueryClient, QueryClientProvider, } from 'react-query'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})


const parsedData = window.location.host.split(".");
console.log(parsedData)
if(parsedData.length >= 3){
	const subDomain = parsedData[0];
	ReactDOM.render(
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ToastProvider>
					<React.StrictMode>
						<SubDomainApp subDomain={subDomain} />
					</React.StrictMode>
				</ToastProvider>
			</AuthProvider>
		</QueryClientProvider>, document.getElementById('root'));
}else{
  	ReactDOM.render(
		<React.StrictMode>
		  	<MainApp />
		</React.StrictMode>, document.getElementById('root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorkerRegistration.unregister();