import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          about,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setTimeout(() => {
        setShowToast(!showToast);
      });
      clearTimeout(setTimeout(() => setShowToast(false), 2000));
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h1 className="text-xl font-bold text-center">Edit Profile</h1>
            <div className="my-1">
              <label className="fieldset-legend text-md">First Name:</label>
              <input
                type="text"
                className="input rounded-lg"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label className="fieldset-legend text-md">Last Name:</label>
              <input
                type="text"
                className="input rounded-lg"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label className="fieldset-legend text-md">Photo URL:</label>
              <input
                type="text"
                className="input rounded-lg"
                placeholder="Photo URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label className="fieldset-legend text-md">Age:</label>
              <input
                type="text"
                className="input rounded-lg"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label className="fieldset-legend text-md">Gender:</label>
              <input
                type="text"
                className="input rounded-lg"
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="my-1">
              <label className="fieldset-legend text-md">About:</label>
              <input
                type="text"
                className="input rounded-lg"
                placeholder="About"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <p className="text-red-600">{error}</p>
            <div className="card-actions justify-center my-2">
              <button onClick={saveProfile} className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, about, gender }} />
      {setShowToast && (
        <div className="toast toast-top toast-end my-20">
          <div className="alert alert-success">
            <span className="text-white">Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
