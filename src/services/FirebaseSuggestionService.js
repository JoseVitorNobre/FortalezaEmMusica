import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";

export default class FirebaseSuggestionService {

    static list = (firestore,callback)=>{
        const coll = collection(firestore,'suggestions')
        getDocs(coll)
        .then(
            (querySnapshot)=>{
                let suggestions = []
                querySnapshot.forEach(
                    (document)=>{
                        suggestions.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(suggestions) 
            }
        )
        .catch(error=>console.log(error))
    }

    static list_onSnapshot = (firestore,callback)=>{
        const coll = collection(firestore,'suggestions')
        const q = query(coll,orderBy('date'))
        onSnapshot(
            q,
            (querySnapshot)=>{
                let suggestions = []
                querySnapshot.forEach(
                    (document)=>{
                        suggestions.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(suggestions) 
            }
        )
    }

    static retrieve = (firestore,callback,_id)=>{
        const docRef = doc(firestore,'suggestions',_id)
        getDoc(docRef)
        .then(
            (docSnapshot)=>{
                if (docSnapshot.exists()) callback(docSnapshot.data())
            }
        )
        .catch(error=>console.log(error))
    }

    static update = (firestore,callback,_id,suggestion)=>{
        const docRef = doc(firestore,'suggestions',_id)
        updateDoc(docRef,suggestion)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))

    }

    static create = (firestore,callback,suggestion)=>{
        const coll = collection(firestore,'suggestions')
        addDoc(coll,suggestion)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    }

    static delete = (firestore,callback,_id) => {
        const docRef = doc(firestore,'suggestions',_id)
        deleteDoc(docRef)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))
    }
}