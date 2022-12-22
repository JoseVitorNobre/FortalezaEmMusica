import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FirebaseMusicService from "../../services/FirebaseMusicService";
import FirebaseMusicSnippetsService from "../../services/FirebaseMusicSnippetsService";
import FirebaseContext from "../../utils/FireBaseContext";

const ListMarkerDataPage = () =>
    <FirebaseContext.Consumer>
        {(firebase) => <ListMarkerData firebase={firebase} />}
    </FirebaseContext.Consumer>

const ListMarkerData = (props) =>{
    const params = useParams();
    const [artist, setArtist] = useState()
    const [inspiration, setInspiration] = useState()
    const [lyrics, setLyrics] = useState()
    const [place, setPlace] = useState()
    const [video, setVideo] = useState()

    useEffect(
        ()=>{
            FirebaseMusicSnippetsService.retrieve(
                props.firebase.getFirestoreDb(),
                (musicSnippet)=>{
                    FirebaseMusicService.retrieve(
                        props.firebase.getFirestoreDb(),
                        (music)=>{
                            setArtist(music.artist.content)
                            setInspiration(music.inspiration.content)
                            setLyrics(music.lyrics)
                            setPlace(music.place.content)
                            setVideo(music.video)
                        },
                        musicSnippet.music_details_id
                    )
                },
                params.id
            )
        }
        ,
        [params.id, props]
    )

    return(
        <div>
            <h1>Letra</h1>
            <p>{lyrics}</p>
            <h1>Local</h1>
            <p>{place}</p>
            <h1>Artista</h1>
            <p>{artist}</p>
            <h1>Inspiracao</h1>
            <p>{inspiration}</p>
        </div>
    )
}

export default ListMarkerDataPage;