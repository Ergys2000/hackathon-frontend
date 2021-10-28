import { useState, useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ContentContainerContext } from '../components/ContentContainer';
import Popup from '../components/Popup';

const PopupExample = (props: any) => {
	const pageContext = useContext(ContentContainerContext);
	const { url } = useRouteMatch();
	useEffect(() => {
		pageContext.setLocationList([{ title: "Popups", url: url }]);
	}, []);

	const [showPopup, setShowPopup] = useState(false);
	return (
		<div>
			<button className="action-button w-32 p-2" onClick={() => setShowPopup(true)}>Show pop up window</button>
			{showPopup ?
				<Popup title="Title" onClose={() => setShowPopup(false)}>
				</Popup>
				: null
			}
		</div>
	);
}

export default PopupExample;
