import React, { useContext, useState } from 'react';
import {
	useHistory,
} from 'react-router-dom';
import Input from './components/Input';

const Login = () => {
	const history = useHistory();

	const [form, setForm] = useState({
		email: "",
		password: ""
	});

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (form.email === "test" && form.password === "test") {
			/* Go to the user page */
			history.push(`/user`);

			/* Set a timeout for when to log the user out of 1 hour */
			setTimeout(() => {
				alert("Your session has expired, please re-login!");
				history.push('/');
			}, 60 * 60 * 1000);
		}
	}

	const onChange = (event: React.ChangeEvent) => {
		event.preventDefault();
		const { name, value } = event.target as any;
		setForm({ ...form, [name]: value });
	}

	return (
		<div className="flex flex-col justify-center items-stretch bg-gray-100 w-9/12 h-1/2 rounded-lg px-10 pt-10 text-center min-w-max max-w-4xl shadow-lg text-gray-700">
			<p className="text-2xl"><b>Bit Balancers Login</b></p>
			<form className="m-5">
				<Input
					label="Email"
					name="email"
					value={form.email}
					onChange={onChange}
					type="text" />
				<Input
					label="Password"
					name="password"
					value={form.password}
					onChange={onChange}
					type="password" />
				<button className={"action-button m-3 p-3 w-24"}
					onClick={onSubmit}>
					Log in
				</button>
			</form>
		</div>
	);
}

export default Login;
