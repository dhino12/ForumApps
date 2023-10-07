import { loadingBarReducer } from "react-redux-loading-bar";
import { configureStore } from "@reduxjs/toolkit";
import leaderboardsReducer from "./leaderboards/reducer";

import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import threadsReducer from "./thread/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import userReducer from "./users/reducer";

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        isPreload: isPreloadReducer,
        users: userReducer,
        threads: threadsReducer,
        threadDetail: threadDetailReducer,
        leaderboards: leaderboardsReducer,
        loadingBar: loadingBarReducer,
    },
});

export default store;
