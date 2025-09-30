import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(user, res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!user || !user._id) return;
    fetchConnections();
  }, [user]);

  if (!connections)
    return (
      <div className="flex flex-row justify-center my-10">
        <h2> Loading.... </h2>
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="flex flex-row justify-center my-10">
        <h2 className="text-xl"> No Connections </h2>
      </div>
    );

  return (
    <div className=" flex flex-col items-center ">
      <h1 className="font-bold text-xl m-4"> Connections </h1>
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="flex items-center w-150 bg-base-300 shadow-lg  m-2 p-5 rounded-lg"
        >
          <img
            src={connection.photoUrl}
            className="w-17 h-17 rounded-[50%] m-4"
            alt="photo"
          />
          <div className="flex flex-col items-start w-2/3 m-4">
            <h1 className="font-bold text-md">
              {" "}
              {connection.firstName + " " + connection.lastName}
            </h1>
            <h1 className="text-sm"> {connection.about}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
