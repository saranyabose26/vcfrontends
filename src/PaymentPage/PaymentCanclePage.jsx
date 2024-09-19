import React from 'react'
import { useNavigate } from 'react-router-dom';

export const PaymentCanclePage = () => {

  const navigate = useNavigate();

  function paymentCancle() {
    localStorage.setItem("user", "");
    localStorage.setItem("email", "");
    navigate("/");
  }

  return (
    <div className='container-fluid d-flex flex-column' style={{ backgroundColor: "rgb(248,249,250)", height: "100vh" }}>

      <div className='w-25 h-50 m-auto'>

        <div className='bg-dark text-white w-100 h-50 d-flex flex-column rounded-top'>

          <div className='rounded-circle border border-white border-4 mb-2 m-auto' style={{ width: "70px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={"50"} fill='#FFFFFF' className='ps-2'><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>        </div>
          <h6 className='text-center'>Failed</h6>
        </div>

        <div className='w-100 h-50 m-auto bg-white rounded-bottom text-dark text-center'>
          <h5 className='mb-2'>Your Payment canceled</h5>
          <button className='btn bg-dark text-white' onClick={paymentCancle}>Try Again</button>
        </div>
      </div>

    </div>
  )
}
