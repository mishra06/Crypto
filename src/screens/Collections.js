import React, { useEffect, useState } from 'react'
import { fetchApi } from '../utils/index';
import { SetCoin } from '../slice/CryptoSlice';
import { useDispatch,useSelector} from "react-redux";
import { URL } from '../utils/constant';
// import Loader from '../components/Loader';
// import { FaRupeeSign } from "react-icons/fa";
import './Collections.css'
import { NavLink , useParams } from 'react-router-dom';



const Collections = () => {

  const { id } = useParams();

  // const [circel ,setLoadings] = useState(true);
  const [pysa,setPysa] = useState('inr')
  const PRICES = pysa ==='inr' ? '₹' : pysa === 'usd' ? '$' : '€'

  const dispatch = useDispatch();
  const coinDetails = useSelector((state)=>state.cryptoSlice.COIN);

  async function GetData() {
    const data = await fetchApi(`${URL}/coins/markets?vs_currency=${pysa}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_API_KEY}`,
          },
    });
    // console.log(data);
    dispatch(SetCoin(data?.data));
    // setLoadings(false);
  }

  useEffect(()=>{
    GetData();
  },[pysa])

  console.log("coinDetails",coinDetails);
  return (
    <>
      
      <div>
        
          <div className="price_options_sec">
              <button onClick={()=>setPysa('inr')}>INR</button>
              <button onClick={()=>setPysa('usd')}>USD</button>
              <button onClick={()=>setPysa('eur')}>EUR</button>
          </div>
          {
          coinDetails.map((coins,index)=>{
            const profitRate = coins.price_change_percentage_24h>0
            return(
              // <CoinsCard coins={coins} PRICES ={PRICES}/>
              <NavLink to={`/collections/${id}`} style={{textDecoration:"none"}}>
              <div key={coins.index} className="exchange_cards">
                    <div className="images">
                      <img style={{height:"80px"}} src={coins.image} alt="coins_image" />
                    </div>
                    <div className="names">
                        {coins.name}
                    </div>
                    <div className="ranks">
                      {coins.market_cap_rank}
                    </div>
                    <div className="prices">
                    {PRICES}{coins.current_price}
                    </div>
                    <div style={profitRate? {color:"green"}:{color:"red"}} className="highs">
                    {/* { profitRate ? "+" + coins.price_change_percentage_24h.toFixed(2): coins.price_change_percentage_24h.toFixed(2)} */}
                    { profitRate ? "+" + coins.price_change_percentage_24h: coins.price_change_percentage_24h}
                    </div>
                    <div className="all_tym_high">
                      <span>{coins.ath}</span>
                      {/* <span className='datess'>{coins.ath_date.slice(0,10)}</span> */}
                      <span className='datess'>{coins.ath_date}</span>
                    </div>
              </div>
              </NavLink>
            )
          })
        }
        
      </div>
    </>
  )
}

// const CoinsCard = (coins,PRICES)=>{

//   // const profitRate = coins.price_change_percentage_24h>0
//   return(
//     <div key={coins.id} className="exchange_cards">
//                     <div className="images">
//                       <img style={{height:"80px"}} src={coins.image} alt="coins_image" />
//                     </div>
//                     <div className="names">
//                         {coins.name}
//                     </div>
//                     <div className="ranks">
//                       {coins.market_cap_rank}
//                     </div>
//                     <div className="prices">
//                     {PRICES}{coins.current_price}
//                     </div>
//                     <div style={profitRate? {color:"green"}:{color:"red"}} className="highs">
//                     {/* { profitRate ? "+" + coins.price_change_percentage_24h.toFixed(2): coins.price_change_percentage_24h.toFixed(2)} */}
//                     { profitRate ? "+" + coins.price_change_percentage_24h: coins.price_change_percentage_24h}
//                     </div>
//                     <div className="all_tym_high">
//                       <span>{coins.ath}</span>
//                       {/* <span className='datess'>{coins.ath_date.slice(0,10)}</span> */}
//                       <span className='datess'>{coins.ath_date}</span>
//                     </div>
//               </div>
//   )
// }

export default Collections

{/* <FaRupeeSign /> */}