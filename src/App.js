import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateUserData } from './redux/userSlice';
import Header from './components/Header';
import { BrowserRouter, Routes,Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Accounts from './components/Accounts';
import axios from './axios'
import NewAccount from './components/NewAccount';
import Account from './components/Account';
import BuyCrypto from './components/BuyCrypto';
function App() {
  const user = useSelector(state=>state.user.user)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
     onAuthStateChanged(auth, (authUser)=>{
         if (authUser){
            dispatch(login({
              email: authUser.email,
              uid: authUser.uid
            }))
           axios.post(`/userinfo?uid=${authUser.uid}`, {
              uid: authUser.uid,
              email: authUser.email,
              accountNumber:0
           }).catch(err=>{
              console.error(err)
           })
           axios.get('/userdata?uid='+authUser.uid).catch(err=>{}).then(r=>{
               dispatch(updateUserData(r.data[0]));
           })
            navigate('/accounts')
         } else {
          navigate('/')
          dispatch(logout())
         }
     })
  }, [])
  return (
    
    <div>
        <Header/>
        <Routes>
          {!user ? (
            <Route exact path="/" element={<Home/>}/>
          ) : (
            <>
               <Route exact path="/accounts" element={<Accounts/>}/>
               <Route exact path="/new/account" element={<NewAccount/>}/>
               <Route exact path="/account/:id" element={<Account/>}/>
               <Route exact path="/buy/crypto/:id" element={<BuyCrypto/>}/>
            </>
          )}
        </Routes>
    </div>
  );
}

export default App;
