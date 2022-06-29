import {useState} from 'react';
interface InputProps {
	label: string;
	active?: boolean;
};
function Input<T extends InputProps>(props: T) {
	const [active, setActive] = useState(props.active);
	const onBlur = (event: any) => {
		event.preventDefault();
		if(props.active) return;
		if(event.target.value == "" || event.target.value == null) setActive(false);
	}
	return (
		<div className={`form-field-container ${active ? "active" : ""}`}>
			<label>{props.label}</label>
			<input onBlur={onBlur} onFocus={() => setActive(true)} className="input" {...props}>
			</input>
		</div>
	);
}

export default Input;
