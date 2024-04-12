import React, { useEffect, useState } from 'react'
import { URL } from '../utils/constant';
import { useDispatch,useSelector} from "react-redux";
import { SetChart } from '../slice/CryptoSlice';
import { fetchApi } from '../utils';
import { useParams } from 'react-router-dom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import Loader from './Loader';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const CoinChart = ({currency}) => {

  // console.log("currency", currency);
    
    const [days,setDays] = useState(1);

    const chartInfo = useSelector((state)=>state.cryptoSlice.CHART);
    const dispatch = useDispatch();

    const { id} = useParams();
    console.log(id,"iddd");

    async function GetData() {
        try {
          const {data} = await fetchApi(`${URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
              },
            }
          );
          console.log("result", data);
          dispatch(SetChart(data.prices));
          
          // console.log(result);
        } catch (error) {
          console.log(error);
          
        }
      }

      useEffect(()=>{
        GetData()
      },[currency, id, days])

      console.log(chartInfo,"infooo...");

      const myData = {
        labels: chartInfo.map((value)=>{
          const date = new Date(value[0])
          // console.log(date);
          const time = date.getHours()>12 ? `${date.getHours()-12} : ${date.getMinutes()} PM` 
          : `${date.getHours()} : ${date.getMinutes()} AM`
          return days ===1 ? time:date.toLocaleDateString()
        }),
        datasets:[
          {
            labels :`Price in Past Days ${days} in ${currency}`,
            data : chartInfo.map((value)=>value[1]),
            borderColor:'orange',
            borderWidth:'3'
          }
        ]
      }

  return (
    <>
     {
      chartInfo.length === 0 ? ( <Loader/>) : (

        <div>
        {/* <Line data={myData} />  */}
        <Line data={myData} options={{
          elements:{
              point:{
                  radius:1, 
              }
          }
        }} style={{marginTop:"5rem", width:"60rem"}} />
  
  <div className='btn' style={{marginTop:"30px"}}>
               <button onClick={()=>setDays(1)} >24 hours</button>
               <button onClick={()=>setDays(30)}>1 Month</button>
               <button onClick={()=>setDays(365)}>1 Year</button>
             </div>
      </div>
      )
     }
    </>
  )
}

export default CoinChart
