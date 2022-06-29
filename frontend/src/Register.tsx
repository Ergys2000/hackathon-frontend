import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Input from "./components/Input";
import Popup from "./components/Popup";
import Select from "./components/Select";
import { API_LINK } from "./util/authenticate";

const Register = (props: any) => {
    const history = useHistory();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
		role: "",
        confirmPassword: "",
		agreed: false,
    });
    
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
		if(!form.agreed) {
			Swal.fire({icon: "error", text: "Please accept the terms and agreements!"});
			return;
		}
		const body = {
			username: form.username,
			email: form.email,
			password: form.password,
			role: form.role
		};

			console.log(API_LINK);
        await fetch(`${API_LINK}/register`, {
			method:"POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		}).then(res => res.json()).then(res => {
			if(res.status === "OK") {
				Swal.fire({ icon: 'success', text: "You have confirmed", timer: 1000, showConfirmButton: false });
				history.push("/login");
			} else {
				Swal.fire({ icon: "error", text: res.result.message });
				history.push("/login");
			}
			console.log(API_LINK);
		}).catch(err => Swal.fire({icon: "error", text: "An error occured, please try again!"}));
    }
	const [show, setShow] = useState(false);
    
    const onChange = (event: React.ChangeEvent) => {
		event.preventDefault();
		const { name, value } = event.target as any;
		setForm({ ...form, [name]: value });
    }
    return (
		<div className="flex flex-col justify-center items-stretch bg-gray-100 w-9/12 rounded-lg px-10 pt-10 text-center min-w-max max-w-4xl shadow-lg text-gray-700 p-10">
			<p className="text-2xl"><b>Bit Balancers Login</b></p>
			<form className="m-5">
				<Input
					label="Username"
					name="username"
					value={form.username}
					onChange={onChange}
					type="text" />
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
				<Input
					label="Confirm Password"
					name="confirmPassword"
					value={form.confirmPassword}
					onChange={onChange}
					type="password" />
					
				<Select onChange={onChange} name="role" value={form.role} label={"Role"}>
					<option value="host">host</option>
					<option value="guest">guest</option>
				</Select>
				<div>
					<p className="hover:cursor-pointer" onClick={() => setShow(true)}>Show terms and conditions</p>
					<input name="agreed" defaultChecked={form.agreed} type="checkbox" onChange={onChange} />
				</div>
				{ show? (<Popup title={"Terms and conditions"} onClose={() => setShow(false)}><div className="px-10 overflow-auto">{terms}</div></Popup>) : null }
				<button className={"action-button m-3 p-3 w-24"}
					onClick={onSubmit}>
					Register
				</button>
				<button className={"action-button m-3 p-3 w-24 bg-red-800 hover:bg-red-700"}
					onClick={onSubmit}>
                    Cancel
				</button>
			</form>
		</div>
    );
}

const terms = `
Terms of Payment
Your terms of payment should include prices, late payment fees or interest, returned check surcharges, and so on.

Guarantees or Warranties
A guarantee or warranty reassures your customers of the quality of your services or products. Guarantees and warranties should also be time-specific so that you won't have to deal with a refund request five years after rendering a service or delivering a product. Settle for a realistic and suitable timeline for your business, such as 30 days or 12 months.

Limitations due to Liability
It is not a safe practice to offer guarantees and warranties in a high-risk industry. Instead, businesses should disclaim warranties to minimize liability.

Refund Policy
Retail businesses typically have different refund policies. A refund policy is usually given its own webpage on e-commerce sites. Service contracts sometimes don't include refund options. Wherever the refund policy of your business occurs, make sure it's consistent. Otherwise, courts will rule against you in the event of a lawsuit.

Timelines for Delivery
Delivery timelines depend on the kind of service or products you sell. There are deadlines for services and scheduled delivery dates for products. Agree on a deadline or delivery date only if you're sure you can hold up your end of the bargain.

Privacy Policy
If your business involves personally identifiable information, it needs a privacy policy as much as it needs terms and conditions. It's also good practice to make reference to confidentiality or privacy in the terms and conditions. However, nothing can take the place of a full-blown privacy policy in a business that involves sensitive information.

Solutions for a Breach
A breach of agreement can come in various forms including but not limited to the following:

Poor-quality products and services
Failure to pay for satisfactory goods or services
Making a refund request after the expiry of valid timelines
Delivery of damaged goods
Refund procedures are used to solve the problem of rendering substandard services or delivering poor-quality products. Another remedy is to indicate preferred methods of dispute resolution. It's best for small businesses to avoid expensive lawsuits and use optional dispute resolution methods.

For instance, the terms and conditions of some businesses specify that all disputes are to be resolved by arbitration and that customers are required to waive their rights to a court trial. Sometimes even the venue and applicable rules of the arbitration process are specified. Specifying arbitration or mediation as a means of dispute resolution can save your business unnecessary legal fees.

Agreement Termination
Agreement termination clauses define how the business relationship that is stated in the terms and conditions should come to a close. They typically state that termination takes place by unanimous agreement or on the condition that a party notifies other parties of their intent to terminate 30 days before the effective date.

Some businesses describe their exact agreement termination process. Agreement termination clauses prepare business owners for contract terminations. That way, businesses aren't taken by surprise and are prepared to replace lost deals with new ones.

Governing Laws
Adding governing laws to your company's terms and conditions is a good practice, especially if your services or products are not limited by location. For instance, if you deal with goods that are shipped across the country or overseas, you should indicate that all disputes will be settled close to home by limiting the jurisdictions where customer complaints can be made.

Typically, a footnote in the section for dispute resolution or a miscellaneous section can serve this purpose. It is best to choose the home jurisdiction of your business for dispute resolution in order to save costs in case of a dispute.

If you need help with example of terms and conditions of a business, post your legal need at UpCounsel's marketplace. UpCounsel accepts only the top 5 percent of lawyers to its site. Lawyers on UpCounsel come from law schools such as Harvard Law and Yale Law and average 14 years of legal experience, including work with or on behalf of companies like Google, Menlo Ventures, and Airbnb.
`;
export default Register;