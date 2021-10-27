import {useState} from 'react';
const PopupExample = (props: any) => {
	const [showPopup, setShowPopup] = useState(false);
	return (
		<div>
			<button className="action-button w-32 p-2" onClick={() => setShowPopup(true)}>Show pop up window</button>
			{showPopup ? 
				<div className="popup flex flex-col justify-center items-center">
					<div className="w-1/2 h-full bg-gray-200">
						<h1>This is the pop up</h1>
						<button onClick={() => setShowPopup(false)}>Close</button>
					</div>	
				</div>
			: null
			}
		</div>
	);
}

export default PopupExample;
