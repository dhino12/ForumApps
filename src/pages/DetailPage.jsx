import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';
import ModalComment from "../components/ModalComment";
import Navigation from "../components/Navigation";
import { CommentsList } from "../components/ThreadList";
import { asyncAddThreadComment, asyncReceiveThreadDetail } from "../states/threadDetail/action";
import { asyncUnsetAuthUser } from "../states/authUser/action";

export default function DetailPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        threadDetail = null,
        authUser,
    } = useSelector((states) => states);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncReceiveThreadDetail(id));
    }, [id, dispatch]);

    const onCommentThread = (text) => {
        dispatch(asyncAddThreadComment({ text, id }));
        setModalOpen(false);
    };

    const onLogout = () => {
        dispatch(asyncUnsetAuthUser());
        navigate('/login');
    };

    if (!threadDetail || !threadDetail.comments) return null;

    return (
      <>
        <header className="App-header bg-dark height-unset">
          <Navigation authUser={authUser} onLogout={onLogout} />
        </header>
        <main>
          { modalOpen && (
          <ModalComment
            setOpenModal={setModalOpen}
            addComment={onCommentThread}
            authUser={authUser}
          />
            )}
          <div className="container-thread" id="detail">
            <h1>{threadDetail.title}</h1>

            <div className="card owner detail">
              <div className="profile">
                <img src={threadDetail.owner.avatar} alt="avatar" width={50} />
                <span>
                  <h3 className="mb-0">{threadDetail.owner.name}</h3>
                  <br />
                  <q>{threadDetail.createdAt}</q>
                  {' '}
                  <br />
                </span>
              </div>
              <p>{threadDetail.category}</p>
              {' '}
              <br />
              <div>{parse(threadDetail.body)}</div>
            </div>

            { authUser !== null && (
              <button
                className="comment"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                komentar
              </button>
            )}

            <div className="container-thread-list">
              <CommentsList commments={threadDetail.comments} />
            </div>
          </div>
        </main>
      </>
    );
}
