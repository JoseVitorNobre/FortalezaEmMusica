import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";

export default class FirebaseUserService {

    static list = (firestore,callback)=>{
        const coll = collection(firestore,'users')
        getDocs(coll)
        .then(
            (querySnapshot)=>{
                let users = []
                querySnapshot.forEach(
                    (document)=>{
                        users.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(users) 
            }
        )
        .catch(error=>console.log(error))
    }

    static list_onSnapshot = (firestore,callback)=>{
        const coll = collection(firestore,'users')
        const q = query(coll,orderBy('name'))
        onSnapshot(
            q,
            (querySnapshot)=>{
                let users = []
                querySnapshot.forEach(
                    (document)=>{
                        users.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(users) 
            }
        )
    }

    static retrieve = (firestore,callback,_id)=>{
        const docRef = doc(firestore,'users',_id)
        getDoc(docRef)
        .then(
            (docSnapshot)=>{
                if (docSnapshot.exists()) callback(docSnapshot.data())
            }
        )
        .catch(error=>console.log(error))
    }

    static update = (firestore,callback,_id,user)=>{
        const docRef = doc(firestore,'users',_id)
        updateDoc(docRef,user)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))

    }

    static create = (firestore,callback,user)=>{
        const coll = collection(firestore,'users')
        addDoc(coll,user)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    }

    static delete = (firestore,callback,_id) => {
        const docRef = doc(firestore,'users',_id)
        deleteDoc(docRef)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))
    }
}