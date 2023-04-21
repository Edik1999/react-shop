import {DocumentData, getDocs, Query} from "firebase/firestore";

export const getDataFromDB = async (q: Query<unknown>) => {
    let appData: DocumentData[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        appData.push(doc.data() as DocumentData);
    });

    return appData
}