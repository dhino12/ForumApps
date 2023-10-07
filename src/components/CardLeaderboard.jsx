/* eslint-disable react/prop-types */
export default function CardLeaderboard({ user, score }) {
    if (user.id === undefined) return null;
    return (
      <div className="card">
        <div className="profile">
          <img src={user.avatar} alt="avatar" width={50} />
          <div>
            <span className="owner">{user.name}</span>
            <span className="date">{user.email}</span>
          </div>
          <div className="card-thread-attribute">
            <p id="category">{score}</p>
          </div>
        </div>
      </div>
    );
}
