import React from 'react';
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
		</div>
	);
}

export default App;
