import { useContext, useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";
import { ContentContainerContext } from "../components/ContentContainer";
import Input from "../components/Input";
import { API_LINK } from "../util/authenticate";

export default function AccountSettings(props: any) {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    const history = useHistory();
    const [form, setForm] = useState({
        id: "",
        username: "",
		email: "",
		state: "",
        address: "",
		city: ""
	});
    useEffect(() => {
        pageContext.setLocationList([{title: "Account settings", url: url}]);
        const jwt = sessionStorage.getItem("jwt");
        fetch(`${API_LINK}/${props.type}/${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${jwt}`
            }
        }).then(res => res.json())
        .then(res => {
            setForm({
                id: res.result.id,
                username: res.result.username,
                email: res.result.email,
                state: res.result.state,
                address: res.result.address,
                city: res.result.city,
            })
        })
    }, []);

    const onSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
        const jwt = sessionStorage.getItem("jwt");
        await fetch(`${API_LINK}/${props.type}/${userId}`, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${jwt}`
            },
            body: JSON.stringify({
                id: form.id,
                username: form.username,
                email: form.email,
                state: form.state,
                address: form.address,
                city: form.city
            })
        }).then(res => res.json())
        .then(res => {
            if(res.status === "OK") {
				Swal.fire({ icon: 'success', text: "Data has been updated", timer: 1000, showConfirmButton: false });
            } else {
				Swal.fire({ icon: 'error', text: res.message, timer: 1000, showConfirmButton: false });
            }
            console.log(res);
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
                <p className="text-xl font-semibold pb-4"> {form.username}'s Data </p>
                <form className="w-full">
                    <Input
                        active={true}
                        label="Email"
                        name="email"
                        onChange={onChange}
                        value={form.email}
                        type="text" />
                    <Input
                        active={true}
                        label="State"
                        name="state"
                        onChange={onChange}
                        value={form.state}
                        type="text" />
                    <Input
                        active={true}
                        label="Address"
                        name="address"
                        onChange={onChange}
                        value={form.address}
                        type="text" />
                    <Input
                        active={true}
                        label="City"
                        name="city"
                        onChange={onChange}
                        value={form.city}
                        type="text" />
                    <div className="flex items-center justify-between space-x-4 mx-4">
                        <button onClick={onSubmit} className="action-button p-2 w-full text-center">
                            Update Data
                        </button>
                        <p onClick={() => history.push(`/${props.type != 'users' ? props.type : 'admin'}/${userId}/changepassword`)} className="action-button p-2 w-full text-center">
                            Change Password
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}