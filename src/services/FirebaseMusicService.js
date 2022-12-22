import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";

export default class FirebaseMusicService {

    static list = (firestore,callback)=>{
        const coll = collection(firestore,'musics')
        getDocs(coll)
        .then(
            (querySnapshot)=>{
                let musics = []
                querySnapshot.forEach(
                    (document)=>{
                        musics.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(musics) 
            }
        )
        .catch(error=>console.log(error))
    }

    static list_onSnapshot = (firestore,callback)=>{
        const coll = collection(firestore,'musics')
        const q = query(coll)
        onSnapshot(
            q,
            (querySnapshot)=>{
                let musics = []
                querySnapshot.forEach(
                    (document)=>{
                        musics.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(musics) 
            }
        )
    }

    static retrieve = (firestore,callback,_id)=>{
        const docRef = doc(firestore,'musics',_id)
        getDoc(docRef)
        .then(
            (docSnapshot)=>{
                if (docSnapshot.exists()) callback(docSnapshot.data())
            }
        )
        .catch(error=>console.log(error))
    }

}