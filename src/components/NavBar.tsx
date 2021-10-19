import {useState} from 'react';
/** Navigation container, it can be extended with additional styles
* @function NavBar
* @returns A styled vertical navigation bar
* */
function NavBar(props: any) {
	return (
		<nav {...props} className={`transition flex flex-col items-center justify-center 
			bg-white h-full w-24 ${props.className}`}>
		</nav>
	);
}

function NavBarItem(props: any) {
	return (
		<div className="has-tooltip group h-20 w-20 flex flex-col justify-center rounded-full 
			items-center text-gray-800 hover:bg-indigo-800 hover:text-gray-200 duration-200">
			<i className="material-icons">home</i>		
			<span className="absolute tooltip text-gray-200 flex flex-col justify-center items-center
				rounded-full w-20 h-12 left-24 bg-indigo-800 duration-200">Tooltip</span>
		</div>
	);
}

export { NavBar, NavBarItem };
