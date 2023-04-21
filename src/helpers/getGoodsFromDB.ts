import {collection, Firestore, query} from "firebase/firestore";
import {getDataFromDB} from "./getDataFromDB";

export async function getGoodsFromDB(db: Firestore){
    const q = query(collection(db, "goods"));
    return getDataFromDB(q)
}
