import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";
import { ContentContainerContext } from "../components/ContentContainer";
import Input from "../components/Input";
import CampsitesList from "../host/CampsitesList";
import { API_LINK } from "../util/authenticate";
import { Campsite } from "../util/types";
import PaymentComponent from "./PaymentComponent";

const ReserveCampsite = (props: {campsite: Campsite}) => {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
    
    const [form, setForm] = useState({
        people: 0,
        startDate: "2022-06-25",
        endDate: "2022-06-25",
    });
    
    const [formInfoConfirmed, setFormInfoConfirmed] = useState(false);

    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Make reservation", url: `/guest/${userId}/makereservation`}, {title: "Reserve", url: url}]);
    }, []);

    const onChange = (event: React.ChangeEvent) => {
        event.preventDefault();
        const {name, value} = event.target as any;
        setForm({...form, [name]: value});
    }
    
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const body = {
            campsiteId: props.campsite.id,
            ...form
        };
        console.log(form);
        fetch(`${API_LINK}/guest/${userId}/reservations`, {
			method:"POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("jwt")
			},
			body: JSON.stringify(body)
		}).then(res => res.json()).then(res => {
            if(res.status === "OK") {
                Swal.fire({icon: "success", text: "Reservation made, enjoy your stay!", timer: 2000});
                setFormInfoConfirmed(true);
            } else {
                Swal.fire({icon: "error", text: "Sorry there was an error making the reservation!", timer: 2000});
            }
		}).catch(err => Swal.fire({icon: "error", text: "An error occured, please try again!"}));
    }
    if (formInfoConfirmed) {
        return <div>
            <PaymentComponent amount={props.campsite.price} />;
        </div>
    } else {

        return (
            <div className="p-10">
                <form onSubmit={onSubmit}>
                    <p>Total capacity: {props.campsite.capacity}</p>
                    <Input onChange={onChange} name="people" value={form.people} label="People" type="number" max={props.campsite.capacity} min={0} active={true} />
                    <Input onChange={onChange} name="startDate" value={form.startDate} label="Start date" type="date" active={true} />
                    <Input onChange={onChange} name="endDate" value={form.endDate} label="End date" type="date" active={true} />
                    <button className="action-button p-5 mx-auto">Reserve</button>
                </form>
            </div>
        );
       
    }
}

export default ReserveCampsite;