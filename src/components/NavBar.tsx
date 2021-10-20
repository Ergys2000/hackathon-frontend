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
		<div className="flex flex-col items-center justify-center w-20 h-20 text-gray-800 duration-200 rounded-full cursor-pointer has-tooltip group hover:bg-indigo-800 hover:text-gray-200 text-select-none">
			<i className="material-icons">home</i>		
			<span className="absolute flex flex-col items-center justify-center w-20 h-12 text-gray-200 duration-200 bg-indigo-800 rounded-full tooltip left-24">Tooltip</span>
		</div>
	);
}

export { NavBar, NavBarItem };
