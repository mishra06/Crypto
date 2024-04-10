import React, { useEffect, useState } from 'react'
import { fetchApi } from '../utils/index';
import { SetCoin } from '../slice/CryptoSlice';
import { useDispatch,useSelector} from "react-redux";
import { URL } from '../utils/constant';
// import Loader from '../components/Loader';
import { FaRupeeSign } from "react-icons/fa";
import './Collections.css'


const Collections = () => {

  // const [circel ,setLoadings] = useState(true);
  const [pysa,setPysa] = useState("inr")
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
  },[PRICES])

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
          coinDetails.map((coins)=>{
            return(
              <div key={coins.id} className="exchange_cards">
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
                    <div className="highs">
                    {coins.high_24h}
                    </div>
                    <div className="all_tym_high">
                      <span>{coins.ath}</span>
                      <span className='datess'>{coins.ath_date.slice(0,10)}</span>
                    </div>
                </div>
            )
          })
        }
        
      </div>
    </>
  )
}

export default Collections

{/* <FaRupeeSign /> */}