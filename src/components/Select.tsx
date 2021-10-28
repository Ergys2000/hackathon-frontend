import React,{useState} from 'react';
interface SelectProps {
	label: string;
	[key: string]: any;
};
function Select(props: SelectProps) {
	let selectRef = React.createRef<HTMLSelectElement>();
	const [active, setActive] = useState(props.default ? true : false);
	const onBlur = (event: any) => {
		event.preventDefault();
		if(event.target.value == "") setActive(false);
	}
	return (
		<div onClick={() => selectRef.current?.focus()} className={`form-field-container ${active ? "active" : ""}`}>
			<label>{props.label}</label>
			<select {...props} ref={selectRef} onBlur={onBlur} onFocus={() => setActive(true)} className={`select ${props.className}`} >
				<option>{props.default}</option>
				{props.children}
			</select>
		</div>
	);
}

export default Select;
