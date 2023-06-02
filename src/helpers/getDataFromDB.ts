import {collection, DocumentData, Firestore, getDocs, orderBy, query, where} from "firebase/firestore";

export const getDataFromDB = async (db: Firestore, email?: string, orders?: boolean) => {
    let appData: DocumentData[] = [];
    let q = query(collection(db, "goods"));

    if (email){
        orders
            ?   q = query(collection(db, "orders"), where("user", "==", email), orderBy('date', 'desc'))
            :   q = query(collection(db, "users"), where("email", "==", email))
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        appData.push(doc.data() as DocumentData);
    });

    return appData
}