import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../axios';
import axiosCore from 'axios'
import '../css/BuyCrypto.css'
const BuyCrypto = () => {
    const userData=useSelector(state=>state.user.userData);
    const {id}=useParams();
    const navigate=useNavigate();
    const [topCoins, setTopCoins] = useState([])
    const [coinName, setCoinName] = useState("");
    const[ modal, setModal ]= useState(null)
    const[specificUser, setSpecificUser]=useState(null)
    const[amount, setAmount] = useState(0);
    useEffect(()=>{
        if (userData){
            let t = false;
             for (let i =0;i<userData.accounts.length;i++){
                  if( userData.accounts[i].id===id){
                     t=true;

                  }
             }
             if (!t) navigate('/accounts');
             axiosCore.get('https://api-ladeadev-ladeadevs-projects.vercel.app/topcoins').then(res => {
              setTopCoins(res.data);
             })
             axios.get("/account?id="+id).then(res=>{
                 setSpecificUser(res.data[0]);
             })
        }
    },[])
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
                     <p>Your <b className="b">balance</b> is currently: ${specificUser.balance}</p>
                     <img src={modal[2]}/>
                     <br/>
                     <input className="buyInput" type="number" onChange={(e)=>{
                         setAmount(e.target.value)
                     }} placeholder={"Amount of "+modal[0]}/>
                     <br/>
                     <p>Est. cost <b className="b">${parseFloat(modal[1].split("$").join("").split(",").join(""))*amount}</b></p>
                     {specificUser.balance >= parseFloat(modal[1].split("$").join("").split(",").join(""))*amount ? (
                        <button className='gBtn' onClick={()=>{
                             if (amount<=0){
                                alert("You cannot buy 0 of a coin!")
                             } else {
                                 console.log(parseFloat(amount))
                                 axios.post('/buy/coin?id='+id, {
                                    coinname: modal[0],
                                    price: parseFloat(modal[1].split("$").join("").split(",").join("")),
                                    amount: parseFloat(amount),
                                    imgURL: modal[2]
                                 });
                                 alert("Crypto Purchased!")
                                 navigate('/account/'+id);
                             }
                        }}>
                          Purchase
                        </button>
                     ) : (
                      <button className='gBtn re' disabled>
                          Purchase
                        </button>
                     )}
                  </div>
                </div>
             </div>
          </div>  
    ) : (
      <></>
    )}
    <div className="buyCryptoContainer">
       <div className="searchUpRow">
          <input className="searchCryptoInput" onChange={(e)=>{setCoinName(e.target.value)}}placeholder="Search for crypto..." />
          <button onClick={()=>{
              if (coinName.split(" ").join("").length===0){
                axiosCore.get('https://api-ladeadev-ladeadevs-projects.vercel.app/topcoins').then(res => {
                  setTopCoins(res.data);
                 })
              } else {
                let fullN = coinName.split(" ").filter(item=>item!=="").join("-");
                axiosCore.get('https://api-ladeadev-ladeadevs-projects.vercel.app/data/'+fullN.toLowerCase()).catch(err=>{
                 setTopCoins([])
              }).then(res => {
                    if (res){
                      let newArr=[coinName.toUpperCase(), res.data.price, res.data.image];
                       setTopCoins([newArr]);
                    }
               })
              }
          }}>Search</button>
       </div>
       <div className="innerCryptoContainer">
       {topCoins.map(coin => (
        <>
          <div className="coinContainer" onClick={()=>{
              setModal(coin)
          }}>
             <div>
                 <img src={coin[2]} />
                <p className="lCB">{coin[0].toUpperCase()} - {coin[1]}</p>
             </div>
          </div>
         
        </>
       ))}
       </div>
    </div>
    </>
  )
}

export default BuyCrypto