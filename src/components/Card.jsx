/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import { BsFillHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

export default function Card({
        id, title, createdAt,
        category, downVotesBy,
        upVotesBy, user, content,
        upVote, downVote, authUser,
        totalComments,
    }) {
    const navigate = useNavigate();
    const onThreadClick = () => {
        if (id.includes("comment")) return;
        navigate(`discussion/${id}`);
    };

    const onThreadPress = ({ key }) => {
        if (key === 'enter' || key === ' ') {
            navigate(`discussion/${id}`);
        }
    };

    const onUpVote = (event) => {
      event.stopPropagation();
      if (upVote) upVote(id);
    };

    const onDownVote = (event) => {
      event.stopPropagation();
      if (downVote) downVote(id);
    };

    if (id === undefined) return null;
    return (
      <div className="card" onClick={onThreadClick} onKeyDown={onThreadPress}>
        <div className="content">
          {
            (title ?? content).includes('class') ? (title ?? content) : parse(title ?? content)
          }
        </div>
        <div className="owner">{user.name}</div>
        <div className="date">{createdAt}</div>
        <div className="card-thread-attribute">
          <p id="category">{category}</p>
          <div className="vote">
            <span
              onClick={onUpVote}
              onKeyUp={onUpVote}
            >
              { upVotesBy.includes(authUser) ? <BsFillHandThumbsUpFill className="liked" /> : <BsFillHandThumbsUpFill /> }
              <span>
                {upVotesBy.length}
                {' '}
              </span>
            </span>
            <span
              onClick={onDownVote}
              onKeyUp={onDownVote}
            >
              { downVotesBy.includes(authUser) ? <BsHandThumbsDownFill className="liked" /> : <BsHandThumbsDownFill /> }
              <span>
                {downVotesBy.length}
                {' '}
              </span>
            </span>
          </div>
        </div>
        {
          totalComments !== undefined && (
            <p className="commentCard">
              Ayo gabung dengan
              {'\u00A0'}
              { totalComments }
              {'\u00A0'}
              komentar lainnya
            </p>
          )
        }
      </div>
    );
}
