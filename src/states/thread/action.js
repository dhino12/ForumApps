import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    ADD_THREADS: 'ADD_THREADS',
    TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
    TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
    TOGGLE_NEUTRALVOTE_THREAD: 'TOGGLE_NEUTRALVOTE_THREAD',
};

function receiveThreadActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads,
        },
    };
}

function addThreadActionCreator(threads) {
    return {
        type: ActionType.ADD_THREADS,
        payload: {
            threads,
        },
    };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: {
            threadId, userId,
        },
    };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD,
        payload: {
            threadId, userId,
        },
    };
}

function toggleNeutralVoteThreadActionCreator() {
    return {
        type: ActionType.TOGGLE_NEUTRALVOTE_THREAD,
    };
}

function asyncAddThread({ title, body, category = '' }) {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const thread = await api.createThread({ title, body, category });
            dispatch(addThreadActionCreator(thread));
        } catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    };
}

function asyncToggleUpVoteThread({ threadId }) {
    return async (dispatch, getState) => {
        const { authUser, threads } = getState();
        const threadData = threads.find((thread) => thread.id === threadId);
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
        try {
            await api.upVote(threadId);
            if (threadData.downVotesBy.includes(authUser.id)) {
                // if already downVote, then remove downVote
                dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
            }
        } catch (error) {
            alert(error.message);
        }
    };
}

function asyncToggleDownVoteThread({ threadId }) {
    return async (dispatch, getState) => {
        const { authUser, threads } = getState();
        const threadData = threads.find((thread) => thread.id === threadId);
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
        try {
            await api.downVote(threadId);
            if (threadData.upVotesBy.includes(authUser.id)) {
                // if already upvoted, then remove upvote
                dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
            }
        } catch (error) {
            alert(error.message);
        }
    };
}

function asyncToggleNeutralVoteThread({ threadId }) {
    return async (dispatch) => {
        dispatch(toggleNeutralVoteThreadActionCreator());
        try {
            await api.neutralVote(threadId);
        } catch (error) {
            alert(error.message);
        }
    };
}

export {
    ActionType,
    receiveThreadActionCreator,
    addThreadActionCreator,
    asyncAddThread,
    asyncToggleUpVoteThread,
    asyncToggleDownVoteThread,
    asyncToggleNeutralVoteThread,
};
