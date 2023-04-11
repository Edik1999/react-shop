import {useEffect, useState} from 'react';
import Home from './pages/Home';
import './styles/index.sass';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import {useLocation, Routes, Route, Navigate} from 'react-router-dom';
import {Company} from './pages/Company';
import {Contacts} from './pages/Contacts';
import {FAQ} from './pages/FAQ';
import {Cart} from './pages/Cart';
import {Fullmenu} from './pages/Fullmenu';
import {Profile} from "./pages/Profile";
import {useGetGoodsQuery} from "./store/mockAPI/mockApi";
import Loader from "./components/Loader";
import {useAppDispatch} from "./store";
import {goods} from "./store/slice/goodsSlice";
import {addDoc, collection, DocumentData, getDocs, query, where, setDoc, doc} from "firebase/firestore";
import {useAuth0} from "@auth0/auth0-react";

function App({db}: { db: any }) {

    // const {isLoading, isError, data} = useGetGoodsQuery("");
    // const body = document.querySelector('body') as HTMLBodyElement;

    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch();
    let location = useLocation();
    const {user} = useAuth0();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    // isLoading ? body.style.overflow = 'hidden' : body.style.overflowY = 'visible'

    async function getDocsFromDB(){
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, "goods"));
        let appData: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            appData.push(doc.data());
        });
        setLoading(false)
        return appData
    }

    useEffect( () => {
        getDocsFromDB().then(res => dispatch(goods(res)));
        // if (data) dispatch(goods(data))
    }, [])

    async function save(){
        await setDoc(doc(db, "users", user?.email as string), {
            email: user?.email,
            name: user?.name !== user?.email ? user?.name : '',
            picture: user?.picture,
            sub: user?.sub
        });
        console.log('user saved');
    }

    async function check(){
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
            check().then(res => {if (res) save()})
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
