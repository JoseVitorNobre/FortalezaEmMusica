import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";

export default class FirebaseCommentService {

    static list = (firestore,callback)=>{
        const coll = collection(firestore,'comments')
        getDocs(coll)
        .then(
            (querySnapshot)=>{
                let comments = []
                querySnapshot.forEach(
                    (document)=>{
                        comments.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(comments) 
            }
        )
        .catch(error=>console.log(error))
    }

    static list_onSnapshot = (firestore,callback)=>{
        const coll = collection(firestore,'comments')
        const q = query(coll,orderBy('data'))
        onSnapshot(
            q,
            (querySnapshot)=>{
                let comments = []
                querySnapshot.forEach(
                    (document)=>{
                        comments.push(
                            {
                                _id:document.id,
                                ...document.data()
                            }
                        )
                    }
                )
                callback(comments) 
            }
        )
    }

    static retrieve = (firestore,callback,_id)=>{
        const docRef = doc(firestore,'comments',_id)
        getDoc(docRef)
        .then(
            (docSnapshot)=>{
                if (docSnapshot.exists()) callback(docSnapshot.data())
            }
        )
        .catch(error=>console.log(error))
    }

    static update = (firestore,callback,_id,Comment)=>{
        const docRef = doc(firestore,'comments',_id)
        updateDoc(docRef,Comment)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))

    }

    static create = (firestore,callback,Comment)=>{
        const coll = collection(firestore,'comments')
        addDoc(coll,Comment)
        .then(
            (docRef)=>{
                callback(docRef.id)
            }
        )
        .catch(error=>console.log(error))
    }

    static delete = (firestore,callback,_id) => {
        const docRef = doc(firestore,'comments',_id)
        deleteDoc(docRef)
        .then(
            ()=>{
                callback(true)
            }
        )
        .catch(error=>console.log(error))
    }
}