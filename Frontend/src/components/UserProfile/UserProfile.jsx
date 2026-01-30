// Frontend/src/components/UserProfile/UserProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import "./UserProfile.css";
const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const UserProfile = () => {
  const [status, setStatus] = useState(STATUS.INITIAL);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { url } = useContext(AppContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setStatus(STATUS.LOADING);

        const token = localStorage.getItem("token");
        console.log(url)
       console.log('http://localhost:8000/api/users/profile')
        const res = await axios.get(
          `${url}/users/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(res.data);
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        console.error("Profile error:", error);
        setStatus(STATUS.ERROR);
      }
    };

    fetchProfile();
  }, []);

  const renderContent = () => {
    switch (status) {
      case STATUS.LOADING:
        return (
          <div className="loader-container">
            <ThreeDots height="60" width="60" color="#2563eb" />
          </div>
        );

      case STATUS.ERROR:
        return <p className="error-text">Failed to load profile</p>;

      case STATUS.SUCCESS:
        return (
          <div className="profile-card">
            {/* 🔙 BACK BUTTON */}
            <button className="back-btn" onClick={() => navigate("/")}>
              <FaArrowLeft />
              <span>Back</span>
            </button>

            <div className="avatar">
              {profile.name.charAt(0)}
            </div>

            <h2>{profile.name}</h2>
            <p className="email">{profile.email}</p>

            <div className="meta">
              <div>
                <span>Joined</span>
                <strong>
                  {new Date(profile.createdAt).toDateString()}
                </strong>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="profile-page">{renderContent()}</div>;
};

export default UserProfile;
