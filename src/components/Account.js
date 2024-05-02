import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../axios'
import { useSelector } from 'react-redux'
import axiosCore from 'axios'
import '../css/Account.css'
const Account = () => {
  const {id} = useParams();
  const userData=useSelector(state=>state.user.userData)
  const user = useSelector(state=>state.user.user);
  const navigate=useNavigate()
  const [data, setData]=useState(null);
  const [modal,setModal] = useState(null);
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(null);
  useEffect(()=>{
     if (userData){
        let t = false;
         for (let i =0;i<userData.accounts.length;i++){
              if( userData.accounts[i].id===id){
                 t=true;
              }
         }
         if (!t) navigate('/accounts');

         axios.get('/account?id='+id).catch(err=>{}).then(res=>{
            setData(res.data[0]);
         })
     }
  }, [])
  return (
    <>  
       {modal ? (
         <div className="modal">
         <div>
            <div>
              <div className="fullRow">
                 <button onClick={()=>{
                    setModal(null)
                    setAmount(0)
                 }}>X</button>
              </div>
              <div className="pC">
                  {modal && price ? (
                     <><p>Your <b className="b">${modal.name}</b> balance is currently {modal.amount}</p>
                     <img src={modal.imageURL}/>
                     <br/>
                        <input className="buyInput" type="number" onChange={(e)=>{
                            setAmount(e.target.value)
                        }} placeholder={"Amount of "+modal.name + " to sell"}/>
                     <p>Est. return <b className="b">${parseFloat(price.split("$").join("").split(",").join(""))*amount}</b></p>
                     {modal.amount >= amount ? (
                        <button className='gBtn' onClick={()=>{
                             if (amount<=0){
                                alert("You cannot sell 0 of a coin!")
                             } else {
                                 axios.post('/sell/coin?id='+id, {
                                    amount: amount,
                                    price: parseFloat(price.split("$").join("").split(",").join("")),
                                    name: modal.name
                                 })
                                 alert("Crypto Sold!")
                                 window.location=window.location;
                                 navigate('/account/'+id);
                             }
                        }}>
                          Sell
                        </button>
                     ) : (
                      <button className='gBtn re' disabled>
                          Sell
                        </button>
                     )}
                     </>
                  ) : (
                     <></>
                  )}
              </div>
            </div>
         </div>
      </div>  
       ) : (
         <></>
       )}
       <div className="accountContainer">
       {data?(
         <div>
        <div className="miniColumnContainer">
            <div className="topGroup">
               <div>
                  <h1>{data.name}</h1>
                  <h1>Total Balance Remaining: ${data.balance}</h1>
                  
               </div>
            </div>
            <div className="bottomGroup">
               <div>
                  <div className="bGBtnRow">
                  <button className="delBtn" onClick={()=>{
                     axios.post("/remove/account",{
                        uid:user.uid,
                        id: id
                     })
                     alert("Account Sucessfully Deleted!")
                     navigate('/accounts')
                  }}>DELETE ACCOUNT</button>
                  <button className="buyBtn" onClick={()=>{
                     navigate("/buy/crypto/"+id);
                  }}>BUY CRYPTO</button>
                  </div>
               </div>
            </div>
        </div>
        <div className="cryptoHoldingContainer">
            <div>
                <h1>Crypto Holdings:</h1>
                <div className="scrollArea">
                     {data.holdings.map(holding=>(
                        <div className="rowItem" onClick={()=>{
                           axiosCore.get('https://api-ladeadev-ladeadevs-projects.vercel.app/data/'+holding.name.split(" ").filter(item=>item!=="").join("-").toLowerCase()).then(res=>{
                              setPrice(res.data.price)
                           })
                           setModal(holding)
                        }}>
                           <img src={holding.imageURL}/>
                              <h1>{holding.name} - {holding.amount}</h1>
                        </div>
                     ))}
                </div>
            </div>
         </div>
        </div>
       ): (
        <>Loading...</>
       )}
    </div>
    </>
  )
}

export default Account