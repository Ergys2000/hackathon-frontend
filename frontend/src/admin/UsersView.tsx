import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { HostCancellationToken } from "typescript";
import { ContentContainerContext } from "../components/ContentContainer";
import PaginatedTable, { PageData } from "../components/PaginatedTable";
import { API_LINK } from "../util/authenticate";
import {User, Campsite} from "../util/types";
import Swal from "sweetalert2";
import Input from "../components/Input";
import Popup from "../components/Popup";

const EditForm = (props: any) => {
  const [form, setForm] = useState({
    id: "",
    username: "",
		email: "",
		state: "",
    address: "",
		city: ""
  });
  useEffect(() => {
    if(props.id) {
      const jwt = sessionStorage.getItem("jwt");
      fetch(`${API_LINK}/users/${props.id}`, {
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
    }
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if(props.id) {
      const jwt = sessionStorage.getItem("jwt");
      await fetch(`${API_LINK}/users/${props.id}`, {
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
  }
  
  const onChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { name, value } = event.target as any;
    setForm({ ...form, [name]: value });
  }
  return (
  <div className="mx-auto bg-gray-100 w-9/12 rounded-lg px-10 pt-10 text-center min-w-max max-w-4xl shadow-lg text-gray-700 p-10">
    <form className="">
      <Input
        active={true}
        label="Username"
        name="username"
        value={form.username}
        onChange={onChange}
        type="text" />
      <Input
        active={true}
        label="Email"
        name="email"
        value={form.email}
        onChange={onChange}
        type="text" />
      <Input
        active={true}
        label="State"
        name="state"
        value={form.state}
        onChange={onChange}
        type="text" />
      <Input
        active={true}
        label="Address"
        name="address"
        value={form.address}
        onChange={onChange}
        type="text" />
      <Input
        active={true}
        label="City"
        name="city"
        value={form.city}
        onChange={onChange}
        type="text" />
      <div className="flex items-center justify-center space-x-4">
        <p className={"action-button m-3 p-3 w-24 cursor-pointer"}
          onClick={onSubmit}>
          Save
        </p>
        <p onClick={() => window.location.reload()} className={"action-button cursor-pointer m-3 p-3 w-24 bg-red-800 hover:bg-red-700"}>
          Cancel
        </p>
      </div>
    </form>
  </div>
  );
}

const handleDelete = (id: any) => {
  Swal.fire({
    icon: "question",
    text: "Are you sure you want to delete this user?",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then(result => {
    if(result.isConfirmed) {
        fetch(`${API_LINK}/users/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            if(res.status === "OK") {
                window.location.reload();
            } else {
                Swal.fire({ icon: 'error', text: res.message, timer: 1000, showConfirmButton: false });
            }
        });
    }
  });
};

export default function UsersList(props: any) {
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState(null);
  const {url, path} = useRouteMatch();
  const pageContext = useContext(ContentContainerContext);
  useEffect(() => {
      pageContext.setLocationList([{title: "Users", url: url}]);
      fetchUsers()
  }, []);
  
  const columns = [
    {
      name: "Id",
      width: 0.25,
      compute: "row['id']",
      Cell: (props: {value: any}) => <div>{props.value}</div>
    },
    {
        name: "Username",
        width: 0.25,
        compute: "row['username']",
        Cell: (props: {value: any}) => <div>{props.value}</div>
    },
    {
        name: "Email",
        width: 0.25,
        compute: "row['email']",
        Cell: (props: {value: any}) => <div>{props.value}</div>
    },
    {
        name: "Role",
        width: 0.25,
        compute: "row['role']",
        Cell: (props: {value: any}) => <div>{props.value}</div>
    },
    {
        name: "Options",
        width: 0.25,
        compute: "row['id']",
        Cell: (props: {value: any}) => {return (<div className="flex items-center space-x-4"><button onClick={() => {setShowPopup(true); setUserId(props.value)}} className="action-button p-5"><i className="material-icons">edit</i></button>
                                            <button onClick={()=> handleDelete(props.value)} className="action-button p-5"><i className="material-icons">delete</i></button></div>)}
    }
  ];

  const fetchUsers = async () => {
      return await fetch(`${API_LINK}/users`, {
          method: "GET",
          headers: {
              "Authorization": "Bearer " + sessionStorage.getItem("jwt")
          }
      })
      .then(res => res.json()).then(res => {
          console.log(res);
          return {data: res.result, result_length: 0};
      })
  }

  return (
      <div>
        <PaginatedTable<any> fetchData={fetchUsers} columns={columns} />

        {showPopup ?
				<Popup title="Edit User" onClose={() => setShowPopup(false)}>
            <div>
                <EditForm id={userId} />
            </div>
				</Popup>
				: null
			}
      </div>
  );
}