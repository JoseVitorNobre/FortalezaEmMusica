import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";
import Popup from "../../components/Popup/Popup";
import { Link } from "react-router-dom";

const ListMarkers = (props) =>{
    const {_id, authors, name, place} = props.marker;
    const [buttonPopUp, setButtonPopUp] = useState(false)
    const position = {
        lat: place.location.latitude,
        lng: place.location.longitude
    }
    
    return (
        <div>
            <Marker
                position={position}
                onClick={()=>setButtonPopUp(true)}
                />
            <Popup trigger={buttonPopUp} setTrigger={setButtonPopUp}>
                <h1>{name.ui}</h1>
                <h3>{authors}</h3>
                <h4>{place.name}</h4>
                <button><Link to={`/seeMarkers/${_id}`} >Vizualizar</Link></button>
            </Popup>
        </div>
    )
}

export default ListMarkers;