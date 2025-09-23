import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";

const Login = () => {
  const [emailId, setEmailId] = useState("teja@gmail.com");
  const [password, setPassword] = useState("Teja@1234");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      BASE_URL + "/login",
      { emailId, password },
      { withCredentials: true }
    );
    dispatch(addUser(res?.data?.data));
    navigate("/");
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h1 className="text-xl font-bold text-center">Login</h1>
          <div className="my-1">
            <label className="fieldset-legend text-md">Email ID</label>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div className=" my-1">
            <label className="fieldset-legend text-md">password</label>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="card-actions justify-center my-2">
            <button onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
