import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces([...response.data]);
      })
      .catch((err) => console.log(err));
    const cancel = document.getElementById("c");
      cancel.value =''
      // const noData = document.getElementById('noData')
      // console.log(noData);
      // noData.innerHTML=''
  }, []);

  const sort = async () => {
    const res = await axios.get("/places", {
      headers: { price: "price", name: "name" },
    });
    console.log(res.data);
    setPlaces(res.data);
  };
  const filterMethod = async (e) => {
    e.preventDefault();

    const res = await axios.get("/places", { headers: { filter: filter } });
    console.log(res.data);
    setPlaces(res.data);
    // setFilter("");
    // if(res.data.length == 0){
    //   console.log("res",res);
    //   const noData = document.getElementById('noData')
    //   console.log(noData);
    //   noData.innerHTML='<h1>NO data found</h1>'
    // }

  };
  const cancelFilterMethod = (e) => {
    console.log(e.target.value);
    const cancel = document.getElementById("c");
    console.log("c:", cancel);
    cancel.value = "";
    console.log("clicked");
    setFilter('')
    // const noData = document.getElementById('noData')
    //   console.log(noData);
    //   noData.innerHTML=''
    axios.get("/places").then((res) => setPlaces(res.data));
  };
  return (
    <div className="mt-8">

      <div className="flex items-center">
        <span
          className="ml-8 text-base text-primary font-semibold bg-gray-200 px-2 rounded-2xl cursor-pointer  py-1 hover:shadow-lg"
          onClick={sort}
        >
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
            sort by price
          </div>
        </span>
        <span className="ml-2 relative text-sm border-none text-gray-500 px-2 rounded-2xl cursor-pointer hover:shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 absolute right-4 top-4"
            onClick={cancelFilterMethod}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>

          <input
            type="text"
            id="c"
            placeholder="Search country name"
            onChange={(e) => setFilter(e.target.value)}
          />
        </span>
        <button
          className="px-2 py-1 bg-gray-200 text-base font-semibold ml-2 text-primary cursor-pointer rounded-2xl hover:shadow-lg"
          onClick={(e) => filterMethod(e)}
        >
          Search
        </button>
      </div>
      {places.length == 0 && <div id="noData" className="m-auto w-1/2 text-gray-500 font-extrabold bg-gray-200 rounded-2xl mt-20 p-5 text-center">NO place found by name <span className="text-primary font-mono">'{filter}'</span></div>}
      
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                key={place._id}
                to={"/place/" + place._id}
                className="rounded-2xl p-4 hover:shadow-xl shadow-slate-500"
              >
                <div className="bg-gray-500 rounded-2xl mb-2 flex">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={"http://localhost:4000/uploads/" + place.photos[0]}
                      alt=""
                    />
                  )}
                </div>

                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                  <span className="font-bold">₹{place.price}</span> per night
                </div>
              </Link>
            );
          })}
      </div>
      <Chatbot/>
    </div>
  );
};

export default IndexPage;
