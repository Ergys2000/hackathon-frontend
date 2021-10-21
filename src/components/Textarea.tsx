import {useState} from 'react';
interface TextareaProps {
	label: string;
};
function Textarea<T extends TextareaProps>(props: T) {
	const [active, setActive] = useState(false);
	const onBlur = (event: any) => {
		event.preventDefault();
		if(event.target.value == "") setActive(false);
	}
	return (
		<div className={`form-field-container ${active ? "active" : ""}`}>
			<label>{props.label}</label>
			<textarea onBlur={onBlur} onFocus={() => setActive(true)} className="textarea" {...props}>
			</textarea>
		</div>
	);
}

export default Textarea;
