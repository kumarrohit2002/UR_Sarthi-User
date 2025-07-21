import { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import PaymentSlip from '../components/PaymentSlip';
import Loader from '../components/Loader'

const Success = () => {
  const [slip,setSlip]=useState(null);

  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  const getSlipData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/appointment/payment-slip/${paymentId}`);
      console.log(response.data);
      setSlip(response.data.slip);
      
    }
    catch (error) {
      console.error('Error fetching payment slip:', error);
    }
  }

  useEffect(()=>{
    getSlipData();
  },[])


  return (
    <div className='bg-white'>
        <Header/>
          <h1 className='text-center text-4xl text-green-400 underline mt-20 '>Payment Successfull</h1>
        <div>
          {
            slip?(
            <div>
              <PaymentSlip slip={slip}/>
            </div>):(
              <div>
                <Loader/>
            </div>)
          }
        </div>
    </div>
  )
}

export default Success