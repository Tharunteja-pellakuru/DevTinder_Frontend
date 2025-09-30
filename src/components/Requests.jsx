import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(user._id, _id);
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return (
      <div className="flex flex-row justify-center my-10">
        <h2> Loading.... </h2>
      </div>
    );

  if (requests.length === 0)
    return (
      <div className="flex flex-row justify-center my-10">
        <h2 className="text-xl"> No Request </h2>
      </div>
    );
  return (
    <div className=" flex flex-col items-center ">
      <h1 className="font-bold text-xl m-4"> Requests </h1>
      {requests.map((request) => (
        <div
          key={request._id}
          className="flex items-center w-150 bg-base-300 shadow-lg  m-2 p-5 rounded-lg"
        >
          <img
            src={request.photoUrl}
            className="w-20 h-20 rounded-[50%] m-4"
            alt="photo"
          />
          <div className="flex flex-col items-start w-2/3 m-4">
            <h1 className="font-bold text-md">
              {" "}
              {request.firstName + " " + request.lastName}
            </h1>
            <h1 className="text-sm italic"> {request.about}</h1>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => handleRequest("rejected", request._id)}
              className="btn btn-error m-2 rounded-lg text-white"
            >
              Reject
            </button>
            <button
              onClick={() => handleRequest("accepted", request._id)}
              className="btn btn-success m-2 rounded-lg text-white"
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
