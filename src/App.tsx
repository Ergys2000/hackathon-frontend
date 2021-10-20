import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Redirect, Link, Route, Switch } from 'react-router-dom';
import UserView from './user/UserView';

function App() {
	return (
		<div className="App w-screen h-screen bg-gray-300">
			<Router>
				<Switch>
					<Route path="/login">
						<h1>Login page</h1>
					</Route>
					<Route path="/user">
						<UserView />
					</Route>
					<Redirect path="/" to="/login" />
				</Switch>
			</Router>
=======
import logo from './logo.svg';
import {NavBar, NavBarItem} from './components/NavBar';
import { ToolTip } from './components/Tooltip';

function App() {
	return (
		<div className="w-screen h-screen bg-white App">
			<div>
				<h1>Action button</h1>
				<button className="p-3 m-5 action-button">Action button</button>
			</div>
			<div className="flex items-center space-x-4">
				<h1>Tooltip</h1>
				<ToolTip iconColor="gray-400" popupColor="white" textColor="black" popupText="Lorem Ipsum Dolor Sit Amet"></ToolTip>
			</div>
			<hr className="border-gray-400" />
			<div className="flex flex-col items-center">
				<h1>Form inputs</h1>
				<form className="w-1/2 p-5 border">
					<input className="input" type="text" />
					<select className="my-5 select">
						<option>option 1</option>
						<option>option 2</option>
						<option>option 3</option>
					</select>
					<textarea className="textarea"></textarea>
				</form>
			</div>
			<hr className="border-gray-400" />
			<div className="flex flex-row">
				<NavBar>
					<NavBarItem />
					<NavBarItem />
					<NavBarItem />
					<NavBarItem />
					<NavBarItem />
					<NavBarItem />
					<NavBarItem />
				</NavBar>
				<div className="flex-1 bg-gray-200">
					<h1>Navigation bar</h1>
				</div>
			</div>
>>>>>>> a24f578803256f27b9da02e1a49bbf2ae3692005
		</div>
	);
}

export default App;
