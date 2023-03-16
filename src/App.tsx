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

function App() {

    const { isLoading, isError, data } = useGetGoodsQuery("");
    const dispatch = useAppDispatch();
    const body = document.querySelector('body') as HTMLBodyElement;
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [location.pathname])

    isLoading ? body.style.overflow = 'hidden' : body.style.overflowY = 'visible'

    useEffect(() => {
        if (data) dispatch(goods(data))
    }, [data, dispatch])

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
