import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import './Map.css'
import ListMarkers from '../markers/ListMarkers'
import FirebaseContext from '../../utils/FireBaseContext'
import FirebaseMusicSnippetsService from '../../services/FirebaseMusicSnippetsService'
import UseGeoLocation from '../../hooks/UseGeoLocation'
import { googleMapsKey } from '../../keys/googleMaps_key'

const MapPage = () =>
    <FirebaseContext.Consumer>
        {(firebase) => <Map firebase={firebase} />}
    </FirebaseContext.Consumer>

const Map = (props) => {
    const [markers, setMarkers] = useState([])
    const location = UseGeoLocation().coordinates
    const [active, setActive] = useState(false)
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [center, setCenter] = useState({
        lat: -3.7304512, 
        lng: -38.5217989
    })
    const centerFortal = {
        lat: -3.7304512, 
        lng: -38.5217989
    }
    useEffect(
        () => {
            FirebaseMusicSnippetsService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (markers)=>{
                    setMarkers(markers)
                }
            )
        }
        ,
        [props.firebase]
    )

    function generateMarkers(){
        if(!markers) return
        return markers.map(
            (marker, i) => {
                return <ListMarkers
                            marker={marker}
                            key={i}
                            firestoreDb={props.firebase.getFirestoreDb()}
                            />
            }
        )
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsKey
    })

    if(!isLoaded){
        return "Mapa não carregado"
    }
    return (
        <div className='mapArea'>
            <div className='mapContainer'>
                <GoogleMap
                    center={center}
                    options={{
                        disableDefaultUI: true,
                        zoomControl: true,
                        disableDoubleClickZoom: true
                    }}
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    zoom={12.75}
                    onLoad={map => setMap(map)}
                    >
                    {generateMarkers()}
                </GoogleMap>
            </div>
            <div className='buttonContainer'>
                <button className='getLocation'
                        onClick={()=>{
                            active ? map.panTo(location) : map.panTo(centerFortal),
                            setActive(!active)
                        }}
                        ></button>
            </div>
        </div>
    )
}

export default MapPage