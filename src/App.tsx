import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginService } from './login-service';
import { AccountInfo } from '@azure/msal-common';

function App() {
	const loginService = new LoginService();
	const [userData, setUserData] = useState<AccountInfo | null>(
		loginService.userData
	);

	useEffect(() => {
		setUserData(loginService.userData);
	}, []);

	const loginHandler = async () => {
		await loginService.login();
	};

	const logoutHandler = async () => {
		await loginService.logout();
		setUserData(null);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>User: {userData?.username}</p>
				<button onClick={loginHandler}>Login</button>
				<button onClick={logoutHandler}>Logout</button>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
