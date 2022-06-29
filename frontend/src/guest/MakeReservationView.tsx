import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { ContentContainerContext } from "../components/ContentContainer";
import Input from "../components/Input";
import Popup from "../components/Popup";
import Table from "../components/Table";
import { API_LINK } from "../util/authenticate";
import { Campsite } from "../util/types";
import MapView, { MapSelect } from "./MapsView";
import ReserveCampsite from "./ReserveCampsite";

export default function MakeReservationView(props: any) {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();

	const [filterPopup, setFilterPopup] = useState(false);
	const [reservePopup, setReservePopup] = useState<{show: boolean; campsite: Campsite|null}>({show: false, campsite: null});
	const [mapPopup, setMapPopup] = useState<{show: boolean; campsite: Campsite|null}>({show: false, campsite: null});
	const [amenitiesPopup, setAmenitiesPopup] = useState<{show: boolean; campsite: Campsite|null}>({show: false, campsite: null});
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Make reservation", url: url}]);
        fetch(`${API_LINK}/guest/${userId}/campsites`,{
            method: "Get",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
            },
        }).then(res => res.json()).then(res => {
            if(res.status === "OK") {
                setCampsites(res.result);
            } else {
                console.log(res);
            }
        });
    }, []);
    const [campsites, setCampsites] = useState<Campsite[]>([]);
    return (
        <div className="w-full flex flex-col justify-center">
            <button className="action-button w-32 p-2 items-start m-5" onClick={() => setFilterPopup(true)}><i className="material-icons">search</i></button>

			{filterPopup ?
				<Popup title="Filter campsites" onClose={() => setFilterPopup(false)}>
                    <FilterForm setResult={(result) => {setCampsites(result); setFilterPopup(false)}} />
				</Popup>
				: null
			}
			{reservePopup.show ?
                <div className="overflow-auto">
                    <Popup title="Reserve" onClose={() => setReservePopup({ ...reservePopup, show: false })}>
                        <ReserveCampsite campsite={reservePopup.campsite as unknown as Campsite} />
                    </Popup>
                </div>
                : null
			}
			{mapPopup.show ?
				<Popup title="Map location" onClose={() => setMapPopup({...mapPopup, show: false})}>
                    <div className="flex flex-row items-center justify-center">
                        <MapView longitude={mapPopup.campsite!.longitude} latitude={mapPopup.campsite!.latitude}  />
                    </div>
				</Popup>
				: null
			}
			{amenitiesPopup.show ?
				<Popup title="Amenities" onClose={() => setAmenitiesPopup({...amenitiesPopup, show: false})}>
                    <AmenitiesView campsite={amenitiesPopup.campsite!} />
				</Popup>
				: null
			}
            <CampSites 
                setReserveCampsite={(camp) => setReservePopup({...reservePopup, show: true, campsite: camp})} 
                camps={campsites}  
                setMapCampsite={(camp) => setMapPopup({show: true, campsite: camp})} 
                setAmenities={(camp) => setAmenitiesPopup({show: true, campsite: camp})} 
            />            
        </div>
    );
}

const AmenitiesView = (props: {campsite: Campsite}) => {
    const [amenities, setAmenities] = useState([]);
    useEffect(() => {
        fetch(`${API_LINK}/campsite/${props.campsite.id}/amenities`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(res => {
                console.log(res);
            if (res.result) {
                setAmenities(res.result);
            } else {
                setAmenities([]);
            }
        });
    }, [])
    return (<div className="p-5">

        {amenities.map((c: any) =>
            <div className="flex flex-col space-y-4 shadow-md rounded-md bg-gray-50 p-4 m-5">
                <div className="flex items-center justify-between">
                    <p> {c.description} </p>
                </div>
            </div>
        )}
    </div>);
}

const FilterForm = (props: { setResult: (result: any) => void }) => {
    const { userId } = useParams() as any;
    const { url, path } = useRouteMatch();
    const [form, setForm] = useState({
        startPrice: 0,
        endPrice: 0,
        startDate: "2022-06-25",
        endDate: "2022-06-25",
        lng: 1,
        lat: 1
    });

    const handleChange = (event: React.ChangeEvent) => {
        event.preventDefault();
        const { name, value } = event.target as any;
        setForm({ ...form, [name]: value });
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const body = { ...form, longitude: form.lng, latitude: form.lat };
        if (body.endPrice == 0) body.endPrice = 99999999;
        console.log(body);
        fetch(`${API_LINK}/guest/${userId}/filter`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => {
            console.log(res)
            props.setResult(res.result);
        });
    }

    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{ title: "Make reservation", url: url }]);
    }, []);
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <form className="w-full flex flex-col" onSubmit={onSubmit}>
                <Input onChange={handleChange} label="Price from" name="startPrice" value={form.startPrice} type="number" min={0} active={true} />
                <Input onChange={handleChange} label="Price to" name="endPrice" value={form.endPrice} type="number" min={0} active={true} />
                <Input active={true} onChange={handleChange} label="Start date" name="startDate" value={form.startDate} type="date" />
                <Input active={true} onChange={handleChange} label="End date" name="endDate" value={form.endDate} type="date" />
                <div className="flex flex-row items-center space-x-10 mx-auto w-full p-5">
                    <MapSelect onPositionChanged={function (lat: number, lng: number): void {
                        setForm({ ...form, lng: lng, lat: lat });
                    }} />
                    <button className="action-button p-5 w-24 mx-auto">Submit</button>
                </div>
            </form>
        </div>
    );
}

const CampSites = (props: {
    camps: Campsite[],
    setReserveCampsite: (value: Campsite) => void,
    setMapCampsite: (value: Campsite) => void,
    setAmenities: (value: Campsite) => void
}) => {
    const { userId } = useParams() as any;
    const { url, path } = useRouteMatch();
    const history = useHistory();
    const pageContext = useContext(ContentContainerContext);
    const { setReserveCampsite, setMapCampsite, setAmenities } = props;
    useEffect(() => {
        pageContext.setLocationList([{ title: "Campsites", url: url }]);
    }, []);
    const columns = [
        {
            name: "Name",
            width: 0.20,
            compute: "row['name']",
            Cell: (props: { value: any }) => <div>{props.value}</div>
        },
        {
            name: "Description",
            width: 0.20,
            compute: "row['description']",
            Cell: (props: { value: any }) => <div>{props.value}</div>
        },
        {
            name: "Capacity",
            width: 0.20,
            compute: "row['capacity']",
            Cell: (props: { value: any }) => <div>{props.value}</div>
        },
        {
            name: "Amenities",
            width: 0.10,
            compute: "row",
            Cell: (props: { value: any }) => <button onClick={() => setAmenities(props.value)} className="action-button p-5">Amenities</button>
        },
        {
            name: "Maps",
            width: 0.10,
            compute: "row",
            Cell: (props: { value: any }) => <button onClick={() => setMapCampsite(props.value)} className="action-button p-5"><i className="material-icons">pin_drop</i></button>
        },
        {
            name: "",
            width: 0.10,
            compute: "row",
            Cell: (props: { value: Campsite }) => <button onClick={() => setReserveCampsite(props.value)} className="action-button p-5">Book</button>
        },
    ];
    return (
        <div className="w-full">
            <Table data={props.camps} columns={columns} />
        </div>
    );
}
