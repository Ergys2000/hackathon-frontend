import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};



function MapView(props: {longitude: number, latitude: number}) {
  const center = {
    lat: props.latitude,
    lng: props.longitude
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCUyyAPYEDnHjMx2SFO99tcVF33EH4JjYI"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
     let marker = new google.maps.Marker({
        position: {lat: props.latitude, lng: props.longitude},
        map,
        draggable: true,
      })
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} />
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}
export default MapView

export const MapSelect = (props: {onPositionChanged: (lat: number, lng:number) => void}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCUyyAPYEDnHjMx2SFO99tcVF33EH4JjYI"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
     let marker = new google.maps.Marker({
        position: {lat: 1, lng: 1},
        map,
        draggable: true,
      })
      marker.addListener('dragend', function (e: any) {
        console.log(marker.getPosition()!.toJSON()); // this === marker
        props.onPositionChanged(marker.getPosition()!.lat(), marker.getPosition()!.lng());
      })
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={{lng: 1, lat: 1}} />
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}