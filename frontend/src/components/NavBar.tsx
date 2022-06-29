import { useHistory} from 'react-router-dom';
/** Navigation container, it can be extended with additional styles
* @function NavBar
* @returns A styled vertical navigation bar
* */
function NavBar(props: any) {
	return (
		<nav {...props} className={`transition flex flex-col items-center justify-center 
			bg-gray-900 h-full w-24 ${props.className}`}>
		</nav>
	);
}


type NavBarItemProps = {
	url: string;
	iconName: string;
	tooltip: string;
};
/** Navigation bar item
* @param link -- where it points to 
* @param icon -- the icon name for the google icons library
* @returns A navigation entry
* */
function NavBarItem(props: NavBarItemProps) {
	const history = useHistory();
	return (
		<div className="sidebar-icon" onClick={() => history.push(props.url)}>
			<i className="material-icons">{props.iconName}</i>
			<span className="sidebar-tooltip text-lg">{props.tooltip}</span>
		</div>
	);
}

export { NavBar, NavBarItem };
