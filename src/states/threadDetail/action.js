import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    ADD_COMMENT: 'ADD_COMMENT',
    CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            threadDetail,
        },
    };
}

function addCommentThreadActionCreator(comment) {
    return {
        type: ActionType.ADD_COMMENT,
        payload: {
            comment,
        },
    };
}

function clearThreadDetailActionCreator() {
    return {
        type: ActionType.CLEAR_THREAD_DETAIL,
    };
}

function asyncReceiveThreadDetail(threadId = '') {
    return async (dispatch) => {
        dispatch(showLoading());

        try {
            const threadDetail = await api.getDetailThread(threadId);

            dispatch(receiveThreadDetailActionCreator(threadDetail));
        } catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    };
}

function asyncAddThreadComment({ text, id = '' }) {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const comment = await api.createComment({ content: text, id });
            dispatch(addCommentThreadActionCreator(comment));
        } catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    };
}

export {
    ActionType,
    addCommentThreadActionCreator,
    receiveThreadDetailActionCreator,
    clearThreadDetailActionCreator,
    asyncReceiveThreadDetail,
    asyncAddThreadComment,
};
