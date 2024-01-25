import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link,useNavigate } from "react-router-dom";
import BookingDates from "../BookingDates";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate()
  const deleteBooking = async (id) =>{
      const deleted = await axios.delete(`/bookings/${id}`)
       console.log(deleted.data);
       toast.info("booking deleted", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: ()=>navigate("/account/bookings"),
        });
       call()
       
  } 

const call = async () => {
  console.log("this is call");
  const response = await axios.get("/bookings");
  const { data } = response;
  console.log(data);
  const data1 = data.filter(item =>{
    return item.place !== null
  })
  setBookings(data1);
  // setBookings(data);
};
  useEffect(() => {
    call();
  }, []);
if(bookings.place === null){
  navigate('/account/bookings')
}
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition:Slide
      />
      
      <ToastContainer />
      <AccountNav />

      <div className="relative">
        {bookings.length == 0 && <div className="w-1/2 m-auto text-center text-gray-500 font-bold bg-gray-200 rounded-2xl px-20 py-2">
          NO bookings done yet
          </div>}
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div className="flex justify-between bg-gray-200 rounded-2xl overflow-hidden mb-4 hover:shadow-lg">
              
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4"
              >
              {/* <div className="w-48"> */}
              <div>

                <PlaceImg place={booking.place} />
              </div>
              <div className="py-2 pr-3 grow">
                <h2 className="text-xl font-semibold border-b border-gray-400 py-1 hover:text-primary">
                  {booking.place.title}
                </h2>

                <div className="flex justify-between items-center">
                  <div className="text-xl">
                    <BookingDates
                      booking={booking}
                      className="mb-2 mt-3 text-gray-500"
                      />

                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                          />
                      </svg>
                      <span className="text-2xl">
                        Total Price: ₹{booking.place.price}
                      </span>
                    </div>
                  </div>
                  {/* <div className="text-red-800 px-2 py-2 bg-gray-100 rounded-2xl hover:shadow-lg" >
                    <svg
                    onClick={()=>deleteBooking(booking._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                    </svg>
                  </div> */}
                </div>
              </div>
            </Link>
            <div className="text-red-800 px-2 py-2 rounded-2xl" >
                    <svg
                    onClick={()=>deleteBooking(booking._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                    </svg>
                  </div>
                        </div>
            
          ))}
          
      </div>
    </div>
  );
};

export default BookingsPage;
