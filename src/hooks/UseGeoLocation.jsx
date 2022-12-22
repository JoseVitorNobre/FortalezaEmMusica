import React, { useEffect, useState } from "react";

const UseGeoLocation = () =>{
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: 0, lng: 0}
    })    

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates:{
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

    const onError = (error) =>{
        setLocation({
            loaded: true,
            error
        })
    }
    useEffect(
        ()=>{
            if(!("geolocation" in navigator)){
                onError({
                    error: {
                        code: 0,
                        message: "GeoLocalização não suportada"
                    }
                })
            }
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        }
        ,
        []
    )

    return location
}

export default UseGeoLocation