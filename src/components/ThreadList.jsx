/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import Card from "./Card";
import CardLeaderboard from "./CardLeaderboard";

function ThreadList({ threads, upVote, downVote }) {
    return (
      <div className="item">
        {threads.map((thread, key) => thread && (
          <Card
            {...thread}
            key={key}
            upVote={upVote}
            downVote={downVote}
          />
        ))}
      </div>
    );
}

function LeaderboardsList({ leaderboards }) {
    return (
      <div className="item">
        {leaderboards.map((leaderboard, key) => leaderboard && (
          <CardLeaderboard
            {...leaderboard}
            key={key}
          />
        ))}
      </div>
    );
}

function CommentsList({ commments }) {
    return (
      <div className="item">
        {commments.map((comment, key) => comment && (
          <Card
            {...comment}
            user={comment.owner}
            key={key}
          />
        ))}
      </div>
    );
}

export {
  ThreadList, LeaderboardsList,
  CommentsList,
};
