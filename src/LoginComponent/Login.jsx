import React from 'react'
import "./login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useState } from 'react'
import instance from '../AxiosInstance/axiosinstance.js'
import { useDispatch } from 'react-redux'

export const Login = () => {

  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");
  const [error, setError] = useState("")
  const dispatch = useDispatch();

  //Login function
  async function login(e) {
    e.preventDefault();

    if (setError != "") {
      setError("");
    }

    if (email.current.value != "" && password.current.value != "") {
      const data = {
        email: email.current.value,
        password: password.current.value
      }

      //API to call Login
      await instance.post("Users/Login", data).then(async (res) => {
        if (res.data.message === "Login Successfull") {
          await instance.get("ServiceDetails/AllServiceDetails").then((res) => {
            const data = [...res.data];
            dispatch({ type: 'AddServiceDetailsData', data })
          })
          await instance.get("FeedBack/GetUserFeedBack").then((res) => {
            const data = [...res.data]
            dispatch({ type: "AddRatingData", data })
          })
          await instance.get("Users/PreviousHistory", {
            headers: {
              email: email.current.value
            }
          }).then((res) => {
            const data = res.data
            dispatch({ type: 'AddPreviousHistoryData', data })
          })
          email.current.value = "";
          password.current.value = "";
          navigate(`/Home/${res.data.token}`);
        } else {
          setError(res.data.message);
        }
      })

    } else {
      setError("Please Enter all the fields")
    }
  }

  return (
    <div id='loginpage' className='d-flex flex-column'>
      <div className='row m-auto w-50 h-75 overflow-hidden' id='loginConetntDiv'>
        <div className='col'>
          <h1>VEHICLE CARE PLATFORM</h1>
          <img src="./images/mechanicPhoto.jpg" className='img-fluid h-100' loading='lazy'></img>
        </div>

        <div className='col-sm d-flex flex-column'>

          <div className='w-75 m-auto'>

            <form action="post" onSubmit={login}>
              <div className='mb-3'>
                <label htmlFor='emailName' className='form-label'>Email</label>
                <input type={"email"} className="form-control form-control-lg" id='emailName' placeholder='Email' ref={email} />
              </div>

              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type={"password"} className="form-control form-control-lg" id='password' placeholder='Password' ref={password} />
              </div>
              {error != "" && <div className='mb-3  text-center'>
                <label className='form-text text-danger'>{error}</label>
              </div>}

              <button className='btn btn-dark text-white d-flex m-auto mb-3'>Login</button>
            </form>
            <h5 className='text-center text-body'>or</h5>
            <div className='d-flex'>
              <Link to="/NewAccount" className='text-body-secondary m-auto loglink'>Create New Account</Link>
              <Link className='text-center text-body-secondary m-auto loglink' >Forgot Password</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
