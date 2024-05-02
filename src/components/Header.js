import React from 'react'
import '../css/Header.css'
import { useSelector } from 'react-redux'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'
const Header = () => {
    const navigate = useNavigate();
    const user=useSelector(state=>state.user.user)
    const provider = new GoogleAuthProvider();
  return (
    <div className="headerContainer">
        <div className="headerInner">
            <h2>PCrypto</h2>
            <div className="btnRow">
                {user ? (
                    <>
                       <button onClick={()=>{
                        signOut(auth);
                    }}>SIGNOUT</button>
                    
                    <button onClick={()=>{
                        navigate("/accounts")
                    }}>ACCOUNTS</button>
                    </>
                ):(
                    <button onClick={()=>{
                        signInWithPopup(auth, provider).catch(err=>{});
                    }}>LOGIN WITH GOOGLE</button>
                )}
            </div>
        </div>
    </div>
  )
}

export default Header