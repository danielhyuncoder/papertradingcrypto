import React, { useEffect,useState } from 'react'
import '../css/NewAccount.css'
import { useSelector } from 'react-redux'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
const NewAccount = () => {
    const userData = useSelector(state=>state.user.userData)
    const user = useSelector(state=>state.user.user)
    const[name,setName] = useState("");
    const[amount,setAmount] = useState(0);
    const navigate=useNavigate()
  return (
    <div className="newAccountContainer">
        <div>
               {userData ? (
                  <>
                                 <h2>Create New <b className="g">Trading</b> Account</h2>
             {userData.accountNumber>=5?(<p className="r">Maximum Account Limit Reached</p>):(<></>)}
             <br />
             <input onChange={(e)=>{
                 setName(e.target.value)
             }} placeholder="Name of Account" />
             <br/>
             <input onChange={(e)=>{
                 setAmount(parseInt(e.target.value))
             }}  placeholder="Amount of starting USD"/>
             <br />
             {userData.accountNumber>=5 ? (
                 <button disabled>Create Account</button>
             ) : (
                <button className="gAccBtn"onClick={()=>{
                    if (name.length>0&&amount>0){
                        axios.post("/new/account?id="+userData._id, {
                            name: name,
                            balance: amount,
                            coins:0,
                            owner: user.uid
                        })
                        alert("Created New Trading Account!")
                         navigate('/accounts')
                    } else {
                        alert("You cannot have an account without a name or without any starting USD!")
                    }
                }}>Create Account</button>
             )}
                  </>
               ):(
                <></>
               )}
        </div>
    </div>
  )
}

export default NewAccount