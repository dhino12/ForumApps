import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { receiveAuthUserActionCreator } from "../authUser/action";
import { receiveThreadActionCreator } from "../thread/action";
import { receiveUsersActionCreator } from "../users/action";

function asyncPopulateUserAndThread() {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            const threads = await api.getAllThread();
            const users = await api.getAllUsers();

            dispatch(receiveThreadActionCreator(threads));
            dispatch(receiveUsersActionCreator(users));
        } catch (error) {
            if (error.message === 'Token maximum age exceeded') {
                alert('Please Login again');
                api.removeAccessToken();
                window.location.href = '/login';
            }
            alert(error.message)
        }
        dispatch(hideLoading());
    };
}

function asyncUserLogged() {
    return async (dispatch) => {
        dispatch(showLoading());
        try {
            if (api.getAccessToken() !== null) {
                const me = await api.getOwnProfile();
                dispatch(receiveAuthUserActionCreator(me));
            }
        } catch (error) {
            alert(error.message);
        }
        dispatch(hideLoading());
    };
}

export { asyncPopulateUserAndThread, asyncUserLogged };
