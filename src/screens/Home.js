import React, { useEffect, useState } from 'react'
import './Home.css'
import { useDispatch,useSelector} from "react-redux";
import { fetchApi } from '../utils/index';
import { SetData } from '../slice/CryptoSlice';
import { URL } from '../utils/constant';
import Loader from '../components/Loader'
import ThreedModel from './ThreedModel';


const Home = () => {

  const [loading,setLoading] = useState(true);

  const details = useSelector((state)=>state.cryptoSlice.DATA)

  const dispatch = useDispatch();
  async function GetData() {
    const data = await fetchApi(`${URL}/exchanges`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_API_KEY}`,
          },
    });
    // console.log(data.data);
    dispatch(SetData(data?.data));
    setLoading(false); 
}

useEffect(()=>{
  GetData()
},[])
console.log("new",details);


  return (
    <>
    {
      loading ? <Loader/>:
      
        <div>
          {
            details.map((coin)=>{
              return(
                <div key={coin.id} className="exchange_cards">
                    <div className="image">
                      <img style={{height:"100px"}} src={coin.image} alt="coins_image" />
                    </div>
                    <div className="name">
                        {coin.name}
                    </div>
                    <div className="price">
                      {coin.trade_volume_24h_btc.toFixed(0)}
                    </div>
                    <div className="rank">
                      {coin.trust_score_rank}
                    </div>
                    <div className="rank">
                      {coin.year_established}
                    </div>
                </div>
              )
            })
          }
        </div>
    }
    </>
  )
}

export default Home
