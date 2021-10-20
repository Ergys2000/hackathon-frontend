import {useState} from 'react';
const Input = (props: any) => {
	const [active, setActive] = useState(false);
	const onBlur = (event: any) => {
		event.preventDefault();
		if(event.target.value == "") setActive(false);
	}
	return (
		<div className={`input-container ${active ? "active" : ""}`}>
			<label>aksjdfa</label>
			<input onBlur={onBlur} onFocus={() => setActive(true)} className="input" {...props}>
			</input>
		</div>
	);
}

export default Input;
