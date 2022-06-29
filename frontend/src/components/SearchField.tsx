import React, { useState } from 'react';

const SearchField = (props: any) => {
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);

	const onBlur = (event: React.FocusEvent) => {
		event.preventDefault();
		if ((event.target as any).value == "") {
			setOpen(false);
		}
		setFocus(false);
	};

	const onFocus = (event: React.FocusEvent) => {
		event.preventDefault();
		setFocus(true);
		setOpen(true);
	}

	return (
		<div onClick={() => setOpen(true)}
			className={`${open ? "w-64 rounded-xl p-2 bg-gray-200" : "w-12 rounded-full p-1"} ${focus ? "border-indigo-700" : "border-black" } flex flex-row justify-around transition-all duration-100
			items-center border`}>
			<i className={`material-icons transition-all duration-100 hover:text-indigo-700 ${focus ? "text-indigo-700" : ""}`}>search</i>
			{open ?
				<input {...props} autoFocus={true} onFocus={onFocus} onBlur={onBlur} className={`bg-gray-200 focus:outline-none`} />
				: null
			}
		</div>
	);
}

export default SearchField;
