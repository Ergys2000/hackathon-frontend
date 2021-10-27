import React, {useState} from 'react';
import {Link} from 'react-router-dom';
type Location = {
	title: string;
	url: string;
};
/** The content page context, used to change the header of the page */
export const ContentContainerContext = React.createContext({
	getLocationList: (): Location[] => [],
	setLocationList: (locationList: Location[]) => console.log(locationList)
});
/** Where content will be displayed in the user page */
const ContentContainer = (props: any) => {
	const [locations, setLocations] = useState<Location[]>([]);
	const contextValue = {
		getLocationList: () => [...locations],
		setLocationList: (locationList: Location[]) => setLocations(locationList)
	};
	return (
		<ContentContainerContext.Provider value={contextValue}>

			<div className="overflow-auto flex-1 flex flex-col min-w-min min-h-min">
				
				{/* The title list is rendered here */}
				<header className="flex flex-row items-center ml-10">
					{locations.map((location, index) =>

						<Link to={location.url} className="flex flex-row justify-evenly items-center text-gray-800 text-3xl my-3">
							<p className="hover:text-purple-700">{location.title}</p>

							{/* Render the arrow only if it is not the last item in the list */}
							{index !== locations.length - 1
								? <i className="material-icons">arrow_forward</i>
								: null
							}
						</Link>
					)}
				</header>

				{/* The children and other props go here */}
				<section {...props} className="flex-1 text-gray-900 p-5"></section>

			</div>

		</ContentContainerContext.Provider>
	);
}

export default ContentContainer;
