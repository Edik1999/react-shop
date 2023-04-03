import {useEffect} from 'react';
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
import {addDoc, collection, DocumentData, getDocs, query, where} from "firebase/firestore";
import {useAuth0} from "@auth0/auth0-react";

function App({db}: { db: any }) {

    let mode = 'db'; // 'db' for data from firestore database, '' for mock api data

    const {isLoading, isError, data} = useGetGoodsQuery("");
    const dispatch = useAppDispatch();
    const body = document.querySelector('body') as HTMLBodyElement;
    let location = useLocation();
    const {user} = useAuth0();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    isLoading ? body.style.overflow = 'hidden' : body.style.overflowY = 'visible'

    async function getDocsFromDB(){
        const querySnapshot = await getDocs(collection(db, "goods"));
        let appData: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            appData.push(doc.data());
        });
        return appData
    }

    useEffect( () => {
        if(mode === 'db'){
            getDocsFromDB().then(res => dispatch(goods(res)));
        }else{
            if (data) dispatch(goods(data))
        }
        // eslint-disable-next-line
    }, [data, dispatch, mode])

    async function save(){
        await addDoc(collection(db, "users"), {
            email: user?.email,
            name: user?.name,
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
            check()
                .then(res => {
                    if(res){
                        save();
                    }
                });
        }
        // eslint-disable-next-line
    }, [user])

    return (
        <>
          <Header></Header>
          {isLoading && <Loader></Loader>}
          {isError ? (
              <p>Oops, something went wrong...</p>
          ) : (
              <div className="container container--fluid">
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/company" element={<Company/>} />
                  <Route path="/contacts" element={<Contacts/>} />
                  <Route path="/faq" element={<FAQ/>} />
                  <Route path="/cart" element={<Cart/>} />
                  <Route path="/menu" element={<Fullmenu/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
              </div>
          )}
          <Footer></Footer>
        </>
    );
}

export default App;
