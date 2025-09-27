const UserCard = ({ user, status }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

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
              <button className="btn btn-error m-2 rounded-lg text-white">
                Ignored
              </button>
              <button className="btn btn-success m-2 rounded-lg text-white">
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
