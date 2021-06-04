import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './MainApp';
import SubDomainApp from './SubDomainApp';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/AuthContext';

const parsedData = window.location.host.split(".");
console.log(parsedData)
if(parsedData.length >= 3){
	const subDomain = parsedData[0];
	ReactDOM.render(
		<AuthProvider>
			<React.StrictMode>
				<SubDomainApp subDomain={subDomain} />
			</React.StrictMode>
		</AuthProvider>, document.getElementById('root'));
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
