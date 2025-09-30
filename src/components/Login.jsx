import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h1 className="text-xl font-bold text-center">
            {isLogin ? "Login" : "Signup"}
          </h1>
          {!isLogin && (
            <>
              {" "}
              <div className="my-1">
                <label className="fieldset-legend text-md">First Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>{" "}
              <div className="my-1">
                <label className="fieldset-legend text-md">Last Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
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
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions flex flex-col items-center my-2">
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="btn btn-primary"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
            <p
              className=" m-2 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "New User? Signup here."
                : "Existing User? Login Here."}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
