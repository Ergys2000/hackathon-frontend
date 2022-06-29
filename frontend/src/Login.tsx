import React, { useContext, useState } from 'react';
import {
	useHistory,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from './components/Input';
import { authenticate } from './util/authenticate';

const Login = () => {
	const history = useHistory();

	const [form, setForm] = useState({
		username: "",
		password: ""
	});

	const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await authenticate(form.username, form.password).then(res => {
			if(res.status === "OK") {
			sessionStorage.setItem("jwt", res.result.token);
			sessionStorage.setItem("role", res.result.role);
			/* Set a timeout for when to log the user out of 1 hour */
			setTimeout(() => {
				alert("Your session has expired, please re-login!");
				history.push('/');
			}, 60 * 60 * 1000);
			history.push(`/${res.result.role}/${res.result.userId}`);
			} else {
				Swal.fire({icon: 'error', text: res.message})
			}
		}).catch(err => Swal.fire({icon: 'error', text: err.message}));
	}

	const onChange = (event: React.ChangeEvent) => {
		event.preventDefault();
		const { name, value } = event.target as any;
		setForm({ ...form, [name]: value });
	}

	return (
		<div className="flex flex-col justify-center items-stretch bg-gray-100 w-9/12 h-auto rounded-lg px-10 pt-10 text-center min-w-max max-w-4xl shadow-lg text-gray-700">
			<img className='w-64 mx-auto' src="logo.svg" alt="" />
			<p className="text-2xl"><b>Bit Balancers Login</b></p>
			<form className="m-5">
				<Input
					label="Username"
					name="username"
					value={form.username}
					onChange={onChange}
					type="text" />
				<Input
					label="Password"
					name="password"
					value={form.password}
					onChange={onChange}
					type="password" />
				<div className="flex flex-row justify-between px-5">
					<p onClick={() => history.push("/register")} className="text-blue-700 hover:text-blue-500 hover:cursor-pointer">Register</p>
					<p onClick={() => history.push("/forgot")} className="text-blue-700 hover:text-blue-500 hover:cursor-pointer">Forgot password?</p>
				</div>
				<button className={"action-button m-3 p-3 w-24"}
					onClick={onSubmit}>
					Log in
				</button>
			</form>
		</div>
	);
}

export default Login;
