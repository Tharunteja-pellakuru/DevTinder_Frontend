import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getFeed = async () => {
    try {
      const feed = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(feed?.data?.data);
      dispatch(addFeed(feed?.data?.data));
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
