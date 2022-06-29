import { useContext, useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";
import { ContentContainerContext } from "../components/ContentContainer";
import Table from "../components/Table";
import { API_LINK } from "../util/authenticate";
import { Reservation } from "../util/types";

export default function MyReservations(props: any) {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
    const pageContext = useContext(ContentContainerContext);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [update, setUpdate] = useState(0);
    useEffect(() => {
        pageContext.setLocationList([{title: "My reservations", url: url}]);
        fetch(`${API_LINK}/guest/${userId}/reservations`, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(res => {
            if(res.status === "OK") {
                setReservations(res.result);
            } else {
                Swal.fire({icon: "error", text: "Sorry there was an getting reservation!", timer: 2000});
            }
        });
    }, [update]);
    return (
        <div>
            <Reservations updateList={()=>setUpdate(update+1)} reservations={reservations} />
        </div>
    );
}

const Reservations = (props: {reservations: Reservation[], updateList: () => void}) => {
    const {userId} = useParams() as any;
    const columns = [
       {
        name: "Campsite",
        width: 0.25,
        compute: "row['campsite']['name']",
        Cell: (props: {value: any}) => <p>{props.value}</p>
       },
       {
        name: "People",
        width: 0.25,
        compute: "row['people']",
        Cell: (props: {value: any}) => <p>{props.value}</p>
       },
       {
        name: "Start date",
        width: 0.25,
        compute: "row['startDate'].split('T')[0]",
        Cell: (props: {value: any}) => <p>{props.value}</p>
       },
       {
        name: "End date",
        width: 0.25,
        compute: "row['endDate'].split('T')[0]",
        Cell: (props: {value: any}) => <p>{props.value}</p>
       },
       {
        name: "",
        width: 0.20,
        compute: "row",
        Cell: (props: {value: any}) => <button onClick={() => deleteReservation(props.value)} className="action-button p-5 bg-red-600"><i className="material-icons">delete</i></button>
       },
    ];
    
    const deleteReservation = (reservation: Reservation) => {
        console.log(reservation);
        if(window.confirm("Are you sure you want to delete this campsite?")) {
            fetch(`${API_LINK}/guest/${userId}/reservations/${reservation.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("jwt")
                }
            }).then(res => res.json()).then(res => {
                if(res.status === "OK") {
                    Swal.fire({icon: "success", text: "Reservation deleted successfully!"});
                    props.updateList();
                } else {
                    Swal.fire({icon: "error", text: "Sorry reservation could not be deleted!"});
                }
            }).catch(err => console.log(err));
        }
    }
    

    return (
        <Table<Reservation> columns={columns} data={props.reservations} />
    );
}