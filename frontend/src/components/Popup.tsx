type PopupProps = {
	title: String;
	onClose: () => void;
	[key: string]: any;
};
function Popup(props: PopupProps) {
	return (
		<div className="popup flex flex-col justify-center items-center py-1 overflow-auto">
			<div className="w-3/4 h-auto pb-8 bg-gray-200 overflow-auto">
				<div className="flex flex-row w-full p-5">
					<h1 className="flex-1 text-center">{props.title}</h1>
					<i onClick={props.onClose} className="material-icons cursor-pointer hover:text-red-600">close</i>
				</div>
				<div>{props.children}</div>
			</div>
		</div>
	);
}

export default Popup;
