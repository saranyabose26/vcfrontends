import { React, useState } from 'react'
import { FeedBack } from '../HomePage/FeedBack';
import instance from '../AxiosInstance/axiosinstance';
export const PaymentSuccessPage = () => {

  const [page, setPage] = useState("success");

  //Function to update appoinment to previous history
  async function paymentSuccess() {
    const data = {
      email: localStorage.getItem("email"),
      id: localStorage.getItem("Id")
    }
    //API call to update to previous history
    await instance.put("Users/addPeviousHistory", data).then((res) => {
      if (res.data.message === "Data update to previous history") {
        localStorage.setItem("Id", "");
        setPage("");
      }
    })

  }
  return (
    <>
      {page === "success" ? <div className='container-fluid d-flex flex-column' style={{ backgroundColor: "rgb(248,249,250)", height: "100vh" }}>

        <div className='w-25 h-50 m-auto'>

          <div className='bg-dark text-white w-100 h-50 d-flex flex-column rounded-top'>

            <div className='rounded-circle border border-white border-4 mb-2 m-auto' style={{ width: "70px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={"50"} fill='#FFFFFF' className='ps-1'><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
            </div>
            <h6 className='text-center'>Success</h6>
          </div>

          <div className='w-100 h-50 m-auto bg-white rounded-bottom text-dark text-center'>
            <h5 className='mb-2'>Your Payment Successfull</h5>
            <button className='btn bg-dark text-white' onClick={paymentSuccess}>Continue</button>
          </div>
        </div>

      </div> : <FeedBack></FeedBack>}

    </>
  )
}
