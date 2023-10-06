/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import Navigation from '../components/Navigation';
import { ThreadList, LeaderboardsList } from '../components/ThreadList';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { asyncPopulateUserAndThread } from '../states/shared/action';
import {
  asyncAddThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
  asyncToggleUpVoteThread,
} from '../states/thread/action';
import FilterThreads from '../components/FilterThreads';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

export default function HomePage() {
    const {
      threads = [],
      users = [],
      authUser,
      leaderboards = [],
    } = useSelector((states) => states);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const params = searchParams.get("category");

    useEffect(() => {
        alert('selamat datang');
        dispatch(asyncPopulateUserAndThread());
        dispatch(asyncReceiveLeaderboards());
    }, [dispatch]);

    const onAddThread = (title, body, category) => {
        dispatch(asyncAddThread({ title, body, category }));
        dispatch(asyncPopulateUserAndThread());
    };

    const onLogout = () => {
        dispatch(asyncUnsetAuthUser());
        navigate('/login');
    };

    const onUpVote = (id) => {
      dispatch(asyncToggleUpVoteThread({ threadId: id }));
      if (threads.find((thread) => thread.upVotesBy.includes(authUser.id))) {
        dispatch(asyncToggleNeutralVoteThread({ threadId: id }));
      }
    };

    const onDownVote = (id) => {
      dispatch(asyncToggleDownVoteThread({ threadId: id }));
      if (threads.find((thread) => thread.downVotesBy.includes(authUser.id))) {
        dispatch(asyncToggleNeutralVoteThread({ threadId: id }));
      }
    };

    const onFilterCategory = (category) => {
      setSearchParams({ category });
    };

    const threadList = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread?.ownerId),
        authUser: authUser?.id == null ? 0 : authUser.id,
    }));
    const threadsFilter = threadList.filter((thread) => thread.category.includes(params));

    return (
      <>
        <header className="App-header">
          <Navigation authUser={authUser} onLogout={onLogout} />
          <Jumbotron addThread={onAddThread} authUser={authUser} />
        </header>
        <main>
          <div className="title">
            <span>
              <h1>Postingan terkini</h1>
              {authUser && (
                <>
                  <p>
                    Selamat Datang
                    <strong>{` ${authUser.name} !`}</strong>
                  </p>
                  <span>
                    FilterBy:
                    <FilterThreads
                      params={params}
                      onFilter={onFilterCategory}
                      threads={threadList}
                    />
                  </span>
                </>
              )}
            </span>
          </div>
          <div className="container-thread-list">
            <ThreadList
              threads={(threadsFilter.length === 0) ? threadList : threadsFilter}
              upVote={onUpVote}
              downVote={onDownVote}
            />
            <div className="leaderboards">
              <h1>Leaderboards</h1>
              <LeaderboardsList
                leaderboards={leaderboards}
                upVote={onUpVote}
                downVote={onDownVote}
              />
            </div>
          </div>
        </main>
      </>
    );
}
