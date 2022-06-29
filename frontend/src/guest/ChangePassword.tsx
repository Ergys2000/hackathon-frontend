import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";
import { ContentContainerContext } from "../components/ContentContainer";
import Input from "../components/Input";
import { API_LINK } from "../util/authenticate";

export default function UpdatePassword(props: any) {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
		confirmPassword: "",
	});

    const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
        const jwt = sessionStorage.getItem("jwt");
        await fetch(`${API_LINK}/reset/${userId}/update`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                oldPassword: form.oldPassword,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword,
            })
        }).then(res => res.json())
        .then(res => {
            if(res.status === "OK") {
				Swal.fire({ icon: 'success', text: "Password has been changed", timer: 1000, showConfirmButton: false });
            } else {
				Swal.fire({ icon: 'error', text: res.message, timer: 1000, showConfirmButton: false });
            }
        });
	}

    const onChange = (event: React.ChangeEvent) => {
		event.preventDefault();
		const { name, value } = event.target as any;
		setForm({ ...form, [name]: value });
	}

    return (
        <div className="rounded-md bg-white shadow-sm p-4 w-1/2 mx-auto">
            <div className="flex flex-col space-y-2 items-center">
                <p className="text-xl font-semibold pb-4"> Update Password </p>
                <form className="w-full">
                    <Input
                        label="Current Password"
                        name="oldPassword"
                        onChange={onChange}
                        type="password" />
                    <Input
                        label="New Password"
                        name="newPassword"
                        onChange={onChange}
                        type="password" />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        onChange={onChange}
                        type="password" />
                    <div className="flex items-center justify-between space-x-4 mx-4">
                        <button onClick={onSubmit} className="action-button p-2 w-full text-center">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}