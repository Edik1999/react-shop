import {collection, Firestore, query, where} from "firebase/firestore";
import {getDataFromDB} from "./getDataFromDB";

export async function getUserFromDB(db: Firestore, email: string | undefined) {
    const q = query(collection(db, "users"), where("email", "==", email));
    return getDataFromDB(q)
}
