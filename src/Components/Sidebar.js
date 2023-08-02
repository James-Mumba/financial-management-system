import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../Firebaze";

function Sidebar() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  function out() {
    signOut(auth)
      .then(() => {
        navigate("/");
        //Sign-out successfull
      })
      .catch((error) => {
        let errorMessage = error.errorMessage;
        console.log(errorMessage);
      });
  }
  return (
    <div className="sidebar">
      <div className="logo"></div>
      <div className="navigation">
        <Link to={"/Dashboard"}>Dashboard</Link>
        <Link to={"/Income"}>Income</Link>
        <Link to={"/Expenses"}>Expenses</Link>
        <Link to={"/Experriment"}>Experriment</Link>
        <Link onClick={out} className="logout">
          Log out
        </Link>
      </div>
    </div>
  );
}
export default Sidebar;
