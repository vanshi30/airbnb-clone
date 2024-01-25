import React from 'react'

const PlaceImg = ({place,index=0,className=null}) => {
    if(!place.photos?.length){
        return ''
    }
    if(!className){
        className ="h-32 w-32 rounded-2xl object-cover"; 
    }
  return (
    <div>
         
                {/* //   <img className="object-cover rounded-2xl" src={'http://localhost:4000/uploads/'+ place.photos[0]} alt="" /> */}
                  <img className={className} src={'http://localhost:4000/uploads/'+ place.photos[0]} alt="" />
         
    </div>
  )
}

export default PlaceImg