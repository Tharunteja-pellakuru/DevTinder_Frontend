const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  return (
    <div>
      <div className="card bg-base-300 w-80 shadow-sm rounder-2xl">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
            className="w-md m-5 rounded-xl mb-0"
          />
        </figure>
        <div className="card-body">
          <h2 className="mt-0 font-bold text-xl">
            {firstName + " " + lastName}
          </h2>
          <p>{about}</p>
          {age && gender && (
            <p>
              {age}, {gender}
            </p>
          )}
          <p> Skills: {skills.join(", ")}</p>
          <div className="card-actions justify-between">
            <button className="btn btn-primary rounded-lg">Interested</button>
            <button className="btn btn-secondary rounded-lg">Ignored</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
