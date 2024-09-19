import { React, useState, useRef } from 'react';
import instance from '../AxiosInstance/axiosinstance';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';


export const AppoimentBooking = ({ allServiceDetails, user, trackVehicle, token }) => {

    //const stripe=await loadStripe(import.meta.env.VITE_STRIPE_PLUBISHIBLEKEY);

    const [successMessage, setSuccessMessage] = useState(null)

    //useRefs to handel the appoinment form inputs
    const customerName = useRef();
    const phoneNumber = useRef();
    const vehicleNumber = useRef();
    const appoinmentDate = useRef();
    const service = useRef();

    const navigate = useNavigate();

    //Function to book appointment
    async function appoinmentBooking(e) {
        e.preventDefault();

        const data = {
            email: localStorage.getItem("email"),
            customerName: customerName.current.value,
            phoneNumber: phoneNumber.current.value,
            vehicleNumber: vehicleNumber.current.value,
            appoinmentDate: appoinmentDate.current.value,
            service: service.current.value
        }
        //API call for Appointment Booking 
        await instance.post("HomePage/AppointmentBook", data, {
            headers: {
                "token": token
            }
        }).then((res) => {
            if (res.data.message === "Appoiment added") {
                phoneNumber.current.value = "";
                vehicleNumber.current.value = ""
                setSuccessMessage("");
            } else if (res.data.message === "unAuthorized") {
                navigate('/');
            }
        })
    }

    //Function for stripe payment gateway
    async function paymentProcess(amount, service, id) {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PLUBISHIBLEKEY);
        try {
            const data = {
                service: service,
                payment: amount,
                user: user
            }
            localStorage.setItem("Id", id)

            //API call for payment 
            await instance.post("HomePage/payment", data, {
                headers: {
                    "token": token
                }
            }).then((res) => {
                console.log(res.data)
                if (res.data.message === "Payment success") {
                    stripe.redirectToCheckout({
                        sessionId: res.data.session.id,
                    })
                } else {
                    navigate("/")
                }

            })

        } catch (e) {
            console.log(e)

        }

    }

    return (
        <>
            <div className='container-fluid d-flex flex-column' id='containerAP'>

                <div className='m-auto w-50 h-75 rounded my-3'>
                    <h3 className='bg-dark text-white text-center m-0'>Appointment Booking</h3>
                    <div className='w-100 h-100 d-flex flex-column p-3' id='formcontentAP'>

                        <div className='w-75 h-50 m-auto'>
                            <form onSubmit={appoinmentBooking}>
                                <div className='row mb-3'>
                                    <label htmlFor='customerName' className='col-lg-5 col-md-auto col-form-label'>Customer Name</label>
                                    <div className='col'>
                                        <input type="text" className='form-control' id='customerName' ref={customerName} value={user} disabled />
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label htmlFor='phoneNumber' className='col-lg-5 col-md-auto col-form-label'>Phone Number</label>
                                    <div className='col'>
                                        <input type="number" className='form-control' id='phoneNumber' ref={phoneNumber} />
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label htmlFor='vehicleNumber' className='col-lg-5 col-md-auto col-form-label'>Vehicle Number</label>
                                    <div className='col'>
                                        <input type="text" className='form-control' id='vehicleNumber' ref={vehicleNumber} />
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label htmlFor='appoiment' className='col-lg-5 col-md-auto col-form-label'>Available Appointments Dates</label>
                                    <div className='col'>
                                        <select type="text" className='form-control' id='appoiment' ref={appoinmentDate}>
                                            <option value="2024/8/2/5">2024/8/02</option>
                                            <option value="2024/8/3/6">2024/8/03</option>
                                            <option value="2024/8/4/7">2024/8/04</option>
                                            <option value="2024/8/5/1">2024/8/05</option>
                                            <option value="2024/8/6/2">2024/8/06</option>
                                            <option value="2024/8/7/3">2024/8/07</option>
                                            <option value="2024/8/8/4">2024/8/08</option>
                                            <option value="2024/8/9/5">2024/8/09</option>
                                            <option value="2024/8/10/6">2024/8/10</option>
                                            <option value="2024/8/11/7">2024/8/11</option>
                                            <option value="2024/8/12/1">2024/8/12</option>
                                            <option value="2024/8/13/2">2024/8/13</option>
                                            <option value="2024/8/14/3">2024/8/14</option>
                                            <option value="2024/8/15/4">2024/8/15</option>
                                            <option value="2024/8/16/5">2024/8/16</option>
                                            <option value="2024/8/17/6">2024/8/17</option>
                                            <option value="2024/8/18/7">2024/8/18</option>
                                            <option value="2024/8/19/1">2024/8/19</option>
                                            <option value="2024/8/20/2">2024/8/20</option>
                                            <option value="2024/8/21/3">2024/8/21</option>
                                            <option value="2024/8/22/4">2024/8/22</option>
                                            <option value="2024/8/23/5">2024/8/23</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label htmlFor='typeofservice' className='col-lg-5 col-md-auto col-form-label'>Type of Service</label>
                                    <div className='col'>
                                        <select type="text" className='form-control' id='typeofservice' ref={service}>
                                            {allServiceDetails.map((val) => (<option key={val.ServiceName} value={`${val.ServiceName}/${val.Price}`}>{val.ServiceName}</option>))}
                                        </select>
                                    </div>
                                </div>
                                {successMessage != null &&
                                    <div className='mb-3  text-center'>
                                        <label className='form-text text-success'>Your Appoinment Booked you will get an email on the date of appoinment</label>
                                    </div>
                                }
                                <button className='btn bg-dark text-white d-flex mx-auto'>Book Appointment</button>
                            </form>
                        </div>

                    </div>
                </div>
                <hr></hr>
            </div>

            <h1 className='text-center mt-5'>Track your vehicle</h1>

            {trackVehicle != "" && trackVehicle.map((val) => (<div className='trackAP mx-auto w-75 my-5 border rounded' key={val.vehicleNumber}>
                <span className='h5'>Vehicle Number: </span> <span className='h5'>{val.vehicleNumber}</span>
                <div className='row my-5 mx-auto'>

                    {val.work === "workstarted" ? <div className='col-lg-2 col-md-auto text-center' style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}>
                        <h5>Work Started</h5>
                    </div> :
                        <div className='col-lg-2 col-md-auto text-center' style={{ backgroundColor: "rgb(229,229,229)" }}>
                            <h5>Work Started</h5>
                        </div>}

                    {val.work === "workonprocess" ? <div className='col-lg-2 col-md-auto text-center' style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}>
                        <h5>Work On process</h5>
                    </div> :
                        <div className='col-lg-2 col-md-auto text-center' style={{ backgroundColor: "rgb(229,229,229)" }}>
                            <h5>Work On process</h5>
                        </div>}

                    {val.work === "fiftypercentofworkcompleted" ? <div className='col-lg-3 col-md-auto text-center' style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}>
                        <h5>Fifty percent work completed</h5>
                    </div> :
                        <div className='col-lg-3 col-md-auto text-center' style={{ backgroundColor: "rgb(229,229,229)" }}>
                            <h5>Fifty percent work completed</h5>
                        </div>}

                    {val.work === "workgoingtocomplete" ? <div className='col-lg-3 col-md-auto text-center' style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}>
                        <h5>Work Going to complete</h5>
                    </div> :
                        <div className='col-lg-3 col-md-auto text-center' style={{ backgroundColor: "rgb(229,229,229)" }}>
                            <h5>Work Going to complete</h5>
                        </div>}

                    {val.work === "workcompleted" ? <div className='col-lg-2 col-md-auto text-center' style={{ backgroundColor: "rgb(33,37,41)", color: "white" }}>
                        <h5>Work completed</h5>
                    </div> :
                        <div className='col-lg-2 col-md-auto text-center' style={{ backgroundColor: "rgb(229,229,229)" }}>
                            <h5>Work completed</h5>
                        </div>}

                </div>
                <div className='d-flex justify-content-between px-3 mb-3'>
                    {val.work === "workstarted" && <span className='h4'>Amount : {Number(val.serviceAmount) / 5} ₹</span>}
                    {val.work === "workonprocess" && <span className='h4'>Amount : {Number(val.serviceAmount) / 4} ₹</span>}
                    {val.work === "fiftypercentofworkcompleted" && <span className='h4'>Amount : {Number(val.serviceAmount) / 3} ₹</span>}
                    {val.work === "workgoingtocomplete" && <span className='h4'>Amount : {Number(val.serviceAmount) / 2} ₹</span>}
                    {val.work === "workcompleted" && <span className='h4'>Amount : {Number(val.serviceAmount)} ₹</span>}
                    {val.work === "workcompleted" ? <button className='btn bg-dark text-white' onClick={() => paymentProcess(val.serviceAmount, val.service, val.id)}>Pay</button> : <button className='btn bg-dark text-white' disabled>Pay</button>}

                </div>
            </div>))}
        </>
    )
}


