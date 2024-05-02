import React, { useEffect } from 'react'
import '../css/Accounts.css'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import { useSelector } from 'react-redux'
const Accounts = () => {
  const navigate = useNavigate();
  const userData=useSelector(state=>state.user.userData);
  useEffect(() => {
      
  }, [])
  return (
    <div className="accountsContainer">
        <div>
            <button className="gBtn2" onClick={()=>navigate('/new/account')}>Create New Account</button>
            <br />
            <div className="accountsList">
                {userData ? (
                  <>
                    {userData.accounts.map(account => (
                  <>
                    <div onClick={()=>{
                    navigate('/account/'+account.id)
                 }}>
                      <div>
                         <h2>{account.name}</h2>
                         <h2>Starting Balance: ${account.beginningBal}</h2>
                   
                      </div>
                  </div>
                  <br/>
                  </>
                ))}
                  </>
                ) :(
                  <>Loading accounts...</>
                )}
            </div>
        </div>
    </div>
  )
}

export default Accounts