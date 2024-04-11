import React from 'react'
import './Details.css'
import { useState,useEffect } from 'react'
import { URL } from '../utils/constant';
import { fetchApi } from '../utils';
import { useDispatch,useSelector} from "react-redux";
import { SetDetails } from '../slice/CryptoSlice';
import {useParams} from 'react-router-dom'

const Details = () => {
  const {id} = useParams();
     const IdDetails = useSelector((state)=>state.cryptoSlice.Details);
     const dispatch = useDispatch();



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
        console.log("result", result);
        dispatch(SetDetails(result.data));
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    GetData();
  },[])
  console.log(IdDetails,"idDetails");


  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default Details
