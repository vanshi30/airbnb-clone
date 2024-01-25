import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import ClipLoader from "react-spinners/ClipLoader"


const ProfilePage = () => {
  const navigate = useNavigate()
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  console.log(useParams());
  console.log(subpage);

  // ready is true
  // console.log(ready);
  if (subpage === undefined) {
    subpage = "profile";
  }

  // if ready is false then loading
  if (!ready) {
    // return "Loading.....";
    return <ClipLoader color="primary"/>|| "Loading..."
  }

  // if ready->TRUE, no user exist->TRUE, redirect false->TRUE
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  async function logout() {
    const d = await axios.post("/logout");
    console.log("ddd",d);
    setRedirect("/");
    setUser(null);
  }
  
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav/>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-3xl mb-3">Logged in</h2>
          <div className="text-2xl bg-gray-200 rounded-2xl p-4 mb-2">
        <span className="font-semibold">User:</span> {user.name} <br />
        <span className="font-semibold">Email:</span> {user.email}
          {/* Logged in as {user.name}({user.email}) */}
          </div>
          
          <button className="primary max-w-sm mt-2 text-xl" onClick={logout}>
            Logout
          </button>
        </div>
        
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
