import { React, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../AxiosInstance/axiosinstance';
import { useDispatch } from 'react-redux';

export const FeedBack = () => {

  const navigate = useNavigate();
  const feedback = useRef();
  const rating = useRef();
  const dispatch = useDispatch();

  async function userFeedBack(e) {
    e.preventDefault();
    const data = {
      UserName: localStorage.getItem("user"),
      FeedBack: feedback.current.value,
      Rating: rating.current.value
    }
    await instance.post("FeedBack/UserFeedBack", data).then((res) => {
      if (res.data.message === "FeedBack inserted successfull") {
        dispatch({ type: "AddFeedBackRatingData", data });
        alert("Your feedback taken");
        localStorage.setItem("email", "");
        localStorage.setItem("user", "");
        navigate("/");
      }
    })
  }

  return (
    <div className='mb-3'>
      <div className='w-25 h-25 mx-auto border'>
        <h5 className='text-center bg-dark text-white'>FeedBack Form</h5>

        <div className='w-75 h-75 mx-auto'>
          <form action="post" onSubmit={userFeedBack}>
            <div className='mb-3'>
              <label className='form-label' htmlFor='userName'>User Name</label>
              <input type={"text"} className="form-control" id='userName' value={localStorage.getItem("user")} disabled></input>
            </div>

            <div className='mb-3'>
              <label className='form-label' htmlFor='feedback'>Your FeedBack</label>
              <textarea type={"text"} className="form-control" id='feedback' rows={'3'} ref={feedback} />
            </div>

            <div className='mb-3'>
              <label className='form-label' htmlFor='rating'>Your Rating</label>
              <select className="form-control" id='rating' ref={rating}>
                <option disabled>Rating out of 5</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button className='btn bg-dark text-white d-flex mx-auto mb-3'>Submit</button>
          </form>
        </div>

      </div>
    </div>
  )
}
