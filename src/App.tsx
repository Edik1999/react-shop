import './styles/global.sass';

import {useEffect, useState} from 'react';
import {useLocation, Routes, Route, Navigate} from 'react-router-dom';
import {useAppDispatch} from "./store";
import {goods} from "./store/slice/goodsSlice";
import {collection, getDocs, query, where, setDoc, doc} from "firebase/firestore";
import {useAuth0} from "@auth0/auth0-react";
import {setUserData} from "./store/slice/userSlice";
import {checkUser} from "./helpers/checkUser";
import {getGoodsFromDB} from "./helpers/getGoodsFromDB";

import Home from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import {Company} from './pages/Company';
import {Contacts} from './pages/Contacts';
import {FAQ} from './pages/FAQ';
import {Cart} from './pages/Cart';
import {Fullmenu} from './pages/Fullmenu';
import {Profile} from "./pages/Profile";
import Loader from "./components/Loader";

function App({db}: { db: any }) {

    const [loading, setLoading] = useState(true)

    const dispatch = useAppDispatch();
    let location = useLocation();
    const {user} = useAuth0();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    useEffect(() => {
        getGoodsFromDB(db).then(res => {
            dispatch(goods(res))
            setLoading(false)
        });
    }, [db, dispatch])

    async function save(){
        await setDoc(doc(db, "users", user?.email as string), {
            email: user?.email,
            name: user?.name !== user?.email ? user?.name : '',
            picture: user?.picture,
            sub: user?.sub
        });
        dispatch(setUserData([{
            email: user?.email,
            name: user?.name !== user?.email ? user?.name : '',
            picture: user?.picture,
            sub: user?.sub
        }]))
        console.log('user saved');
    }

    async function checkIsNewUser(){
        const q = query(collection(db, "users"), where("email", "==", user?.email));

        let isNewUser = true;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(() => {
            isNewUser = false
        });

        return isNewUser
    }

    useEffect(() => {
        if (user){
            checkIsNewUser().then(res => {
                if (res){
                    save()
                }else{
                    checkUser(db, user?.email).then((res: any) => dispatch(setUserData(res)))
                }
            })
        }
        // eslint-disable-next-line
    }, [user])

    return (
        <>
          <Header></Header>
          {loading && <Loader></Loader>}
          <div className="container container--fluid">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/company" element={<Company/>} />
              <Route path="/contacts" element={<Contacts db={db}/>} />
              <Route path="/faq" element={<FAQ/>} />
              <Route path="/cart" element={<Cart db={db}/>} />
              <Route path="/menu" element={<Fullmenu/>} />
              <Route path="/profile" element={<Profile db={db}/>} />
              <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
          </div>
          <Footer></Footer>
        </>
    );
}

export default App;
