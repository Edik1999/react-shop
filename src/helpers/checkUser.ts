import {collection, Firestore, query, where} from "firebase/firestore";
import {check} from "./check";

export async function checkUser(db: Firestore, email: string | undefined) {
    const q = query(collection(db, "users"), where("email", "==", email));
    return check(q)
}
