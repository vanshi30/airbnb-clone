import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Perks from "../Perks";

const PlacePage = () => {
  const { id } = useParams();
  console.log(id);
  const [place, setPlace] = useState("");
  const [seeAllAmenities, setSeeAllAmenities] = useState(false);
  const [p, setP] = useState("");
  // const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/places/${id}`)
      .then((response) => {
        console.log("res", response);
        setPlace(response.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  if (!place) return "";

//   if (seeAllAmenities === true){
//     // e.preventDefault();
//     console.log("true");
//     const pp = place.perks.map((pe)=>{
//       return <ul key={pe}>
//         <li>{pe}</li>
//       </ul>
//     })
//     console.log("pp",pp);
//     setP(pp.key)
// return pp
//   }
function seeAllAmenities1(){
console.log("called");
console.log(place.perks);
const pp = place.perks.map((p)=>{
  console.log(p);
  // return p+","
  return <div key={p}>{p}</div>
})
const pp1 = pp.map((p)=>{
  return <div>{p.key} </div>
})
console.log("pp1",pp1);
setP(pp1)
return pp
}
// var mapProp = {
//   center:new google.maps.LatLng(51.508742,-0.120850),
//   zoom:5
// }
// var map = new google.maps.Map(document.getElementsByClassName("google"),mapProp)
// if (seeAllAmenities) {
//   return (
//     <div>
//         <h2 className="font-semibold text-xl p-2 m-2 border-b border-gray-200">Amenities provided by <span className="text-primary font-serif">
//         {place.title}</span></h2>
//       <div className="bg-gray-300 p-4 rounded-2xl m-4 relative">

//         {place.perks.map((p) => {
//           return (
//             <ul key={p}>
//               <li>{p}</li>
//             </ul>
//           );
//         })}
        
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6 absolute top-3 right-3"
//           onClick={() => setSeeAllAmenities(false)}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 18 18 6M6 6l12 12"
//             />
//         </svg>
//       </div>
//       <div className="bg-red-500">
      
//       </div>
//             </div>
//     );
//   }
  return (
    <>
      <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-3xl">{place.title}</h1>
        <AddressLink>{place.address}</AddressLink>

        <PlaceGallery place={place} />

        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="text-2xl font-semibold">Description</h2>
              {place.description}
            </div>
            check-in:{place.checkIn} <br />
            check-out:{place.checkOut} <br />
            Max number of guests:{place.maxGuests}
            <br />
            <button
              className="py-1 px-2 rounded-2xl bg-slate-50 border border-gray-500 mt-1 text-primary"
              // onClick={() => setSeeAllAmenities(!seeAllAmenities)}
              onClick={seeAllAmenities1}
              
            >
              See all Amenities
            </button>
            {p && <div className="bg-white w-fit px-4 py-1 rounded-2xl mt-2 flex gap-3">{p}</div> }
            
          </div>
          <div>
            <BookingWidget place={place} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="text-2xl font-semibold">Extra Info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlacePage;
