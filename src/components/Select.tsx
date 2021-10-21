import {useState} from 'react';
interface SelectProps {
	label: string;
};
function Select<T extends SelectProps>(props: T) {
	const [active, setActive] = useState(false);
	const onBlur = (event: any) => {
		event.preventDefault();
		if(event.target.value == "") setActive(false);
	}
	return (
		<div className={`form-field-container ${active ? "active" : ""}`}>
			<label>{props.label}</label>
			<select onBlur={onBlur} onFocus={() => setActive(true)} className="select" {...props}>
				<option></option>
			</select>
		</div>
	);
}

export default Select;
