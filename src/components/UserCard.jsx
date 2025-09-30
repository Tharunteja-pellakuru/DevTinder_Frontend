import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, status }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const loggedInUser = useSelector((store) => store.user);

  const handleRequest = async (type, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/send/request/" + type + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex m-4">
      <div className="card bg-base-300 shadow-sm w-90 rounder-2xl">
        <figure>
          <img src={photoUrl} alt="photo" className="w-full rounded-xl mb-0" />
        </figure>
        <div className="flex flex-col card-body">
          <h2 className="mt-0 font-bold text-xl">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <div>
              <p className="font-bold text-md">Age: {age}</p>
              <p className="font-bold text-md">Gender: {gender}</p>
            </div>
          )}
          <p className="my-5 text-md text-justify">{about}</p>
          {status && (
            <div className="card-actions justify-center">
              <button
                onClick={() => handleRequest("ignored", _id)}
                className="btn btn-error m-2 rounded-lg text-white"
              >
                Ignored
              </button>
              <button
                onClick={() => handleRequest("interested", _id)}
                className="btn btn-success m-2 rounded-lg text-white"
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
