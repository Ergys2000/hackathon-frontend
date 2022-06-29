import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Swal from "sweetalert2";
import { ContentContainerContext } from "../components/ContentContainer";
import Input from "../components/Input";
import PaginatedTable, { PageData } from "../components/PaginatedTable";
import Popup from "../components/Popup";
import MapView, { MapSelect } from "../guest/MapsView";
import { API_LINK } from "../util/authenticate";
import {User, Campsite} from "../util/types";

export default function CampsitesList(props: any) {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
    const [showPopup, setShowPopup] = useState(false);
    const [campsite, setCampsite] = useState(null);
	const [mapPopup, setMapPopup] = useState<{show: boolean; campsite: Campsite|null}>({show: false, campsite: null});
    const pageContext = useContext(ContentContainerContext);
    useEffect(() => {
        pageContext.setLocationList([{title: "Campsites", url: url}]);
    }, []);
    const fetchUrl = props.isAdmin ? `${API_LINK}/campsite` : `${API_LINK}/host/${userId}/campsites`; 
    const fetchCampsites = async (searchString: string, pageNumber: number, pageSize: number): Promise<PageData<Campsite>> => {
        return await fetch(fetchUrl, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(res => {
            if(res.result_length == 0){
                return {data: [], result_length: 0};
            }
            if(res.result) {
                return {data: res.result, result_length: res.result.length};
            }
            return {data: [], result_length: 0};
        });
    }
    const columns = [
        {
            name: "Name",
            width: 0.25,
            compute: "row['name']",
            Cell: (props: {value: any}) => <div>{props.value}</div>
        },
        {
            name: "Description",
            width: 0.25,
            compute: "row['description']",
            Cell: (props: {value: any}) => <div>{props.value}</div>
        },
        {
            name: "Capacity",
            width: 0.25,
            compute: "row['capacity']",
            Cell: (props: {value: any}) => <div>{props.value}</div>
        },
        {
            name: "Price",
            width: 0.25,
            compute: "row['price']",
            Cell: (props: {value: any}) => <div>{props.value}</div>
        },
        {
            name: "Location",
            width: 0.25,
            compute: "row",
            Cell: (props: {value: Campsite}) => <button onClick={() => setMapPopup({show: true, campsite: props.value})} className="action-button p-5"><i className="material-icons">pin_drop</i></button>
        },
        {
            name: "Update",
            width: 0.25,
            compute: "row['id']",
            Cell: (props: {value: any}) => <button onClick={() => {setCampsite(props.value); setShowPopup(true)}} className="action-button p-5"><i className="material-icons">edit</i></button>
        }
    ];
    return (
        <div>
            <p onClick={() => {setShowPopup(true); setCampsite(null)}} className="action-button w-48 p-2 text-center m-2 cursor-pointer"> Add Campsite </p>
            <PaginatedTable<any> fetchData={fetchCampsites} columns={columns}  />

            {showPopup ?
				<Popup title="Add Campsite" onClose={() => setShowPopup(false)}>
                    <div>
                        <CampsiteForm campsite={campsite} setResult={() => setShowPopup(false)} />
                    </div>
				</Popup>
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
        </div>
    );
}

const CampsiteAmenitiesForm = (props: {campsite : any}) => {
    const [amenities, setAmenities] = useState([]);
    const [form, setForm] = useState({
        id: null,
        description: "",
        campsiteId: props.campsite  
    });

    const handleChange = (event: React.ChangeEvent) => {
        event.preventDefault();
        const {name, value} = event.target as any;
        setForm({...form, [name]: value});
    }

    const updateAmenities = () => {
        if(props.campsite) {
            fetch(`${API_LINK}/campsite/${props.campsite}/amenities`,{
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
            }).then(res => res.json()).then(res => {
                if(res.result) {
                    setAmenities(res.result);
                }else {
                    setAmenities([]);
                }
            });
        }
    }

    const onSubmit = () => {
        if(props.campsite) {
            fetch(`${API_LINK}/campsite/${props.campsite}/amenities`,{
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: form.description,
                    campsite_id: form.campsiteId
                })
            }).then(res => res.json()).then(res => {
                if(res.status === "OK") {
                    updateAmenities();
                } else {
                    Swal.fire({ icon: 'error', text: res.message, timer: 1000, showConfirmButton: false });
                }
            });
        }
    }

    const deleteAmenity = (amenityId : any) => {
        if(props.campsite) {
            fetch(`${API_LINK}/campsite/${props.campsite}/amenities/${amenityId}`,{
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
            }).then(res => res.json()).then(res => {
                if(res.status === "OK") {
                    updateAmenities();
                } else {
                    Swal.fire({ icon: 'error', text: res.message, timer: 1000, showConfirmButton: false });
                }
            });
        }
    }

    useEffect(() => {
        updateAmenities();
	}, []);

    return (
        <div className="p-4 my-2 mx-auto">
            <p className="text-2xl text-center"> Amenities </p>
            <div className="mt-4 flex flex-col items-start">
                {
                    amenities.length > 0 ?
                    <div className="flex flex-col space-y-4 shadow-md rounded-md bg-gray-50 p-4 w-full">
                        {amenities.map((c : any) =>
                            <div className="flex items-center justify-between">
                                <p> {c.description} </p>
                                <p onClick={() => deleteAmenity(c.id)} className="action-button p-2 cursor-pointer"><i className="material-icons">delete</i></p>
                            </div>
                        )}
                    </div>
                    : <p> There are no amenities for this campsite </p>
                }
                <form className="flex items-center space-x-4 my-2 border-t-2 border-black">
                    <Input active={true} onChange={handleChange} label="Amenity Description" name="description" value={form.description} type="text" />
                    <p onClick={onSubmit} className="action-button p-2 cursor-pointer"> Add Amenity </p>
                </form>
            </div>
        </div>
    )
}

const CampsiteForm = (props: {setResult: (result:any) => void, campsite : any}) => {
    const {userId} = useParams() as any;
    const {url, path} = useRouteMatch();
    const history = useHistory();
    const [form, setForm] = useState({
        id: props.campsite,
        name: "",
        description: "",
        price: "",
        capacity: "",
        userId: userId,
        lng: 1,
        lat: 1
    });

    useEffect(() => {
        if(props.campsite) {
            fetch(`${API_LINK}/campsite/${props.campsite}`,{
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                    "Content-Type": "application/json"
                },
            }).then(res => res.json()).then(res => {
                console.log(res.result);
                if(res.result) {
                    setForm({
                        id: res.result.id,
                        name: res.result.name,
                        description: res.result.description,
                        price: res.result.price,
                        capacity: res.result.capacity,
                        userId: userId,
                        lng: res.result.longitude,
                        lat: res.result.latitude
                    });
                }
            });
        }
	}, []);

    const handleChange = (event: React.ChangeEvent) => {
        event.preventDefault();
        const {name, value} = event.target as any;
        setForm({...form, [name]: value});
    }
    
    const onDelete = () => {
        Swal.fire({
            icon: "question",
            text: "Are you sure you want to delete this campsite?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then(result => {
            if(result.isConfirmed) {
                fetch(`${API_LINK}/campsite/${props.campsite}`,{
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
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const body = {
            id: form.id,
            name: form.name,
            description: form.description,
            price: form.price,
            capacity: form.capacity,
            userId: form.userId,
            longitude: location.lng,
            latitude: location.lat
        };
        const fetchLink = props.campsite ? `${API_LINK}/campsite/${userId}/${props.campsite}` : `${API_LINK}/campsite/${userId}`;
        const method = props.campsite ? 'PUT' : 'POST';
        fetch(fetchLink,{
            method: method,
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(res => {
            if(res.status === "OK") {
                window.location.reload();
            } else {
				Swal.fire({ icon: 'error', text: res.message, timer: 1000, showConfirmButton: false });
            }
        });
    }
    
    const [location, setLocation] = useState({lat: 1,  lng:1});

    return (
        <div className="w-full flex flex-col justify-center items-center p-5">
            <form className="w-full flex flex-col" onSubmit={onSubmit}>
                <Input active={true} onChange={handleChange} label="Campsite Name" name="name" value={form.name} type="text" />
                <Input active={true} onChange={handleChange} label="Campsite Description" name="description" value={form.description} type="text" />
                <Input active={true} onChange={handleChange} label="Campsite Capacity" name="capacity" value={form.capacity} type="number" />
                <Input active={true} onChange={handleChange} label="Campsite Price" name="price" value={form.price} type="number" />
                <div className="mx-auto my-5 w-full">
                <MapSelect onPositionChanged={function (lat: number, lng: number): void {
                    setLocation({lat: lat, lng: lng});
                } } />
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <button className="action-button p-5 w-48 text-center">Update Campsite</button>
                    {props.campsite ? 
                        <p onClick={onDelete} className="action-button p-5 w-48 text-center"> Delete </p>
                    : null
                    }
                </div>
                {props.campsite ?
                    <CampsiteAmenitiesForm campsite={props.campsite} />
                    : null
                }
                
            </form>
        </div>
    );
}