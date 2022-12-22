import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";

export default class FirebaseMusicSnippetsService {

    static list = (firestore,callback)=>{
        const coll = collection(firestore,'music_snippets')
        getDocs(coll)
        .then(
            (querySnapshot)=>{
                let music_snippets = []
                querySnapshot.forEach(
                    (document)=>{
                        music_snippets.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(music_snippets) 
            }
        )
        .catch(error=>console.log(error))
    }

    static list_onSnapshot = (firestore, callback)=>{
        const coll = collection(firestore,'music_snippets')
        const q = query(coll )
        onSnapshot(
            q,
            (querySnapshot)=>{
                let music_snippets = []
                querySnapshot.forEach(
                    (document)=>{
                        music_snippets.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(music_snippets) 
            }
        )
    }

    static retrieve = (firestore,callback,_id)=>{
        const docRef = doc(firestore,'music_snippets',_id)
        getDoc(docRef)
        .then(
            (docSnapshot)=>{
                if (docSnapshot.exists()) callback(docSnapshot.data())
            }
        )
        .catch(error=>console.log(error))
    }
}