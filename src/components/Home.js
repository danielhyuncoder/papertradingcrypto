import React from 'react'
import '../css/Home.css'
const Home = () => {
  return (
    <div className="homeContainer">
        <div className="introContainer">
            <div className="centerBlock">
               <h1>PCrypto</h1>
               <p>A place to practice your crypto-trading skills.</p>
            </div>
        </div>
        <div className="advantagesContainer">
            <div className="advContainer">
               <div>
                  <h1>Why trade with fake money?</h1>
                  <br/>
                  <h2>
                      Trading with fake money is a good way to practice your trading skills in a risk-free environment. Think training wheels on a bike for an example. The training wheels serve as a way of protection for beginners learning how to use the bike. This app allows you to trade fake money in the exact same way, thus allowing you to trade without any risk.
                  </h2>
               </div>
            </div>
            <div className="advContainer gr">
               <div>
                  <h1>What can I possibly gain from this?</h1>
                  <br/>
                  <h2>
                     As previously said, you can gain a significant amount of experience by using this platform. The best part is that there is zero risk involved for all parties, allowing you to freely trade various amount of cryptos without worrying whether or not it will go up or down.
                  </h2>
               </div>
            </div>
            <div className="advContainer">
               <div>
                  <h1>What can I trade on here?</h1>
                  <br/>
                  <h2>
                     Since this is specifically a crypto paper trading app, you can only trade existing cryptocurrencies. However, there are over 10,000+ supported cryptocurrencies that you can choose from (Yes, even a majority of popular microcaps), which will help simulate an extremely diverse portfolio.
                  </h2>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Home