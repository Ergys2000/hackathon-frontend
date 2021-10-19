import React from 'react';
import logo from './logo.svg';
import {NavBar, NavBarItem} from './components/NavBar';

function App() {
	return (
		<div className="App w-screen h-screen bg-white">
			<div>
				<h1>Action button</h1>
				<button className="action-button p-3 m-5">Action button</button>
			</div>
			<hr className="border-gray-400" />
			<div className="flex flex-col items-center">
				<h1>Form inputs</h1>
				<form className="w-1/2 border p-5">
					<input className="input" type="text" />
					<select className="select my-5">
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
