import { React } from 'react'

export const PrevoiusHistory = ({ userPreviousVehicleHistory }) => {

  //To bring the date to correct format it was like 2024/8/03/1 something like this to bring it in a proper fromat
  const previousHistoryDateCorrection = userPreviousVehicleHistory.map((val) => {
    const Date = val.appoinmentDate.split("/");
    Date.pop();
    const FullDate = Date.join("/");
    return {
      ...val,
      appoinmentDate: FullDate
    }
  })
  return (
    <>
      {previousHistoryDateCorrection.map((val) => (
        <div className='w-50 h-25 mx-auto d-flex justify-content-between border rounded p-3 mt-3' key={val.vehicleNumber}>
          <div>
            <span className='h5' style={{ color: "rgb(85,90,150)" }}>{val.customerName}</span>
            <p className='ms-1 text-secondary'>({val.vehicleNumber})-{val.service}</p>
          </div>
          <div className='text-secondary'>
            <h6>Serviced on {val.appoinmentDate}</h6>
            <div className='d-flex'>
              <span>Rating</span>
              <div className='border border-dark text-center ms-3 m-0' style={{ width: "30px" }}>5</div>
            </div>
          </div>
        </div>
      )
      )}
    </>
  )
}
