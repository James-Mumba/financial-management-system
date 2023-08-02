import React from "react";
import Sidebar from "../Components/Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";
import { app } from "../Firebaze";

function Income() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });
  return (
    <div className="experiment">
      <Sidebar />
      <div className="zone">Dashboard</div>
    </div>
  );
}

export default Income;
