import { React, useState, useEffect } from 'react'
import { ServiceAndRatings } from "./ServiceAndRatings"
import { AppoimentBooking } from "./AppoimentBooking"
import { PrevoiusHistory } from "./PrevoiusHistory"
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import instance from '../AxiosInstance/axiosinstance'
import "./homepage.css"


export const HomePage = () => {

  const { token } = useParams()
  const allServiceDetails = useSelector((state) => state.serviceDetailsReducer);
  const feedBacks = useSelector((state) => state.ratings);
  const userPreviousVehicleHistory = useSelector((state) => state.previousHistory);

  const navigate = useNavigate();

  const [user, setUser] = useState("");

  //State to track the vehicle
  const [trackVehicle, setTrackVehicle] = useState();

  //Use effect to verify the token and get the user Appointment
  useEffect(() => {
    async function verifyToken() {
      try {
        await instance.post('Users/verifyToken', { token: token }).then(async (res) => {

          setUser(res.data.UserName.name);

          localStorage.setItem('email', res.data.email);
          localStorage.setItem('user', res.data.UserName.name);

          const data = {
            email: res.data.email
          }

          //API call for user details
          await instance.post("HomePage/GetUserAppointment", data, {
            headers: {
              "token": token
            }
          }).then(async (res) => {
            console.log(res.data)
            if (res.data.length > 0) {
              setTrackVehicle(res.data);
            } else {
              setTrackVehicle("");
            }
          })

        })

      } catch (e) {
        console.log("err", e)
        navigate("/")
      }
    }
    verifyToken();
  }, [])


  const [pages, setPages] = useState("Home");

  function handelPages(page) {
    if (page === "Home") {
      setPages("Home");
    } else if (page === "Appointment") {
      setPages("Appointment")
    } else if (page === "PreviousHistory") {
      setPages("PreviousHistory")
    }
  }
  return (
    <>
      <header>
        <nav className='navbar navbar-expand-lg bg-dark navbar-dark '>
          <div className='container-fluid'>
            <Link className='navbar-brand mb-1'>Vevicare</Link>
            <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navitemlink">
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id="navitemlink">
              <ul className='navbar-nav me-auto'>
                <li className='navbar-item'>
                  {pages === "Home" ? <Link className='nav-link active' onClick={() => handelPages("Home")}>Home</Link> : <Link className='nav-link' onClick={() => handelPages("Home")}>Home</Link>}
                </li>
                <li className='navbar-item'>
                  {pages === "Appointment" ? <Link className='nav-link active' onClick={() => handelPages("Appointment")}>Appointment Booking</Link> : <Link className='nav-link' onClick={() => handelPages("Appointment")}>Appointment Booking</Link>}
                </li>
                <li className='navbar-item'>
                  {pages === "PreviousHistory" ? <Link className='nav-link active' onClick={() => handelPages("PreviousHistory")}>Previous Service History</Link> : <Link className='nav-link' onClick={() => handelPages("PreviousHistory")}>Previous Service History</Link>}
                </li>
              </ul>
              <span className="navbar-text me-2">
                {user}
              </span>
              <img className="rounded-circle navbar-text" alt="avatar1" src="../images/profile.png" height={50} width={40} />
            </div>
          </div>
        </nav>
      </header>

      {pages === "Home" && <ServiceAndRatings allServiceDetails={allServiceDetails} feedBacks={feedBacks} />}
      {/* Appoiment Booking */}
      {pages === "Appointment" && <AppoimentBooking allServiceDetails={allServiceDetails} user={user} trackVehicle={trackVehicle} token={token} />}
      {/* Previous History */}
      {pages === "PreviousHistory" && <PrevoiusHistory userPreviousVehicleHistory={userPreviousVehicleHistory} />}

      <br></br>
      <br></br>
      <br></br>
    </>
  )
}
