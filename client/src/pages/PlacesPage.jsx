import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlacesPage = () => {
  const navigate = useNavigate()
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const deletePlaceAccommodation = async (id) =>{
    const res = await axios.delete(`/places/${id}`)
    console.log("deleted:",res.data);
    const {data} = await axios.get('/user-places')
    setPlaces(data)
    toast.info("deleted place(all bookings affiliated with this place are also deleted)", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: ()=>navigate("/account/places"),
      });
    // toast.success("deleted place(all bookings affiliated with this place are also deleted)", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    //   onClose: ()=>navigate("/account/places"),
    //   // transition: Slide,
    // });
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
      <div className="text-center">      

        <Link
          to={"/account/places/new"}
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      {places.length == 0 && <div className="w-1/2 m-auto text-center text-gray-500 font-bold bg-gray-200 rounded-2xl px-20 py-2">
          NO Places placed by you yet
          </div>}
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <div className="flex justify-between mb-2 bg-gray-100 shadow-slate-500 rounded-2xl p-4 cursor-pointer hover:shadow-xl">
            <Link to={'/account/places/'+place._id} className="flex shadow-slate-500 gap-4 bg-gray-100">
              {/* <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl"> */}
              <div className="flex items-center w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl">
               <PlaceImg place={place}/>
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
            <div className="text-red-800 px-2 py-2 rounded-2xl">
                    <svg
                    onClick={()=>deletePlaceAccommodation(place._id)}
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

export default PlacesPage;
