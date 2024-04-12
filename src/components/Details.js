import React, { useState } from 'react'
import './Details.css'
import { useEffect } from 'react'
import { URL } from '../utils/constant';
import { fetchApi } from '../utils';
import { useDispatch,useSelector} from "react-redux";
import { SetDetails } from '../slice/CryptoSlice';
import {useParams} from 'react-router-dom'
import Loader from './Loader';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi"
import { IoPulseOutline } from "react-icons/io5"
import CoinChart from './CoinChart';
// import CoinChart from './CoinChart'

const Details = () => {

  const [loading , setLoading] = useState(true);
  const [currency , setCurrency] = useState('inr');
  const PRICES = currency ==='inr' ? '₹' : '$'
  const {id} = useParams();
   
  const IdDetails = useSelector((state)=>state.cryptoSlice.Details);
  const dispatch = useDispatch();

  const profit = IdDetails.market_data?.price_change_percentage_24h >0

    useEffect(()=>{
      async function GetData() {
        try {
          const result = await fetchApi(`${URL}/coins/${id}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
              },
            }
          );
          // console.log("result", result);
          dispatch(SetDetails(result.data));
          setLoading(false);
          // console.log(result);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      GetData();
    },[id])
    console.log(IdDetails,"idDetails");


  return (
    <>
    {
      loading ? <Loader/> : <>
      <div className="coin_details" style={{display:"flex",justifyContent:'space-evenly'}}>
        <div className="coin_info">
          <div className='btn'>
             <button onClick={()=>setCurrency('inr')} >inr</button>
             <button onClick={()=>setCurrency('usd')}>usd</button>
           </div>
          <div className="time">
            {IdDetails.last_updated} 
          </div>
          <div className="coin_image">
            <img height={"150px"} src={IdDetails.image.large} alt="" />
          </div>
          <div className="coin_name">
            {IdDetails.name}
          </div>
          <div className="coin_price">
          {PRICES}{IdDetails.market_data.current_price[currency]}
          {IdDetails.market_data.price_change_percentage_24h}%
          </div>
          <div className="coin_profit">
          {profit ? <BiSolidUpArrow color='green'/> : <BiSolidDownArrow color='red'/> }
          </div>
          <div className="market_rank">
          <IoPulseOutline color='orange'/>#{IdDetails.market_cap_rank}
          </div>
          <div className="coin_desc">
            <p>{IdDetails.description['en'].split('.')[0]}</p>
          </div>
        </div>
        <CoinChart currency={currency}/>
      </div>
      </>
    }
    </>
  )
}

export default Details
