import { SetStateAction, useEffect} from 'react';
import {collection, doc, DocumentData, Firestore, getDocs, query, setDoc, where} from "firebase/firestore";
import {setUserData} from "../store/slice/userSlice";
import {goods} from "../store/slice/goodsSlice";
import {useAuth0} from "@auth0/auth0-react";
import {useAppDispatch} from "../store";
import {getDataFromDB} from "../helpers/getDataFromDB";

function useAppInit(db: Firestore, setLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }){
    const {user} = useAuth0();
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function checkIsNewUser(){
            const q = query(collection(db, "users"), where("email", "==", user?.email));

            let isNewUser = true;
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(() => {
                isNewUser = false
            });

            return isNewUser
        }

        async function saveUser(){
            await setDoc(doc(db, "users", user?.email as string), {
                email: user?.email,
                name: user?.name !== user?.email ? user?.name : '',
                picture: user?.picture,
                sub: user?.sub
            });
            dispatch(setUserData({
                email: user?.email,
                name: user?.name !== user?.email ? user?.name : '',
                picture: user?.picture,
                sub: user?.sub
            }))
        }

        user && checkIsNewUser().then(isNew => {
            isNew
                ? saveUser()
                    .then(() => console.log('user saved'))

                : getDataFromDB(db, user.email)
                    .then((res: DocumentData[]) => dispatch(setUserData(res[0])))
                    .then(() => console.log('This user already exists'))
        })

        getDataFromDB(db).then(res => {
            dispatch(goods(res))
            setLoading(false)
        });

    }, [db, dispatch, user, setLoading]);
}

export default useAppInit;