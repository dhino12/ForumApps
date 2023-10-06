import api from "../../utils/api";

export const getAccessToken = (store) => (next) => (action) => {
    if (api.getAccessToken()) {
        return action(store.dispatch, store.getState);
    }

    return next(action);
};
