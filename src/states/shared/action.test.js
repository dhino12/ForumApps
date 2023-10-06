/**
 * skenario test
 *
 * - asyncPopulateUsersAndTalks thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeThreadsResponse = [
    {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
    },
];

const fakeUsersResponse = [
    {
        id: "users-1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image-url.jpg",
    },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import api from "../../utils/api";
import { asyncPopulateUserAndThread } from "./action";
import { receiveThreadActionCreator } from "../thread/action";
import { receiveUsersActionCreator } from "../users/action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

describe("asyncPopulateUsersAndTalks thunk", () => {
    beforeEach(() => {
        api._getAllThread = api.getAllThread;
        api._getAllUsers = api.getAllUsers;
        // setup the simplest document possible
    });

    afterEach(() => {
        api._getAllThread = api.getAllThread;
        api._getAllUsers = api.getAllUsers;

        // delete backup data
        delete api._getAllThread;
        delete api._getAllUsers;
    });

    it("should dispatch action correctly when data fetching success", async () => {
        // arrange
        // stub implementation
        api.getAllThread = () => Promise.resolve(fakeThreadsResponse);
        api.getAllUsers = () => Promise.resolve(fakeUsersResponse);

        // mock
        const dispatch = vi.fn();

        // action
        await asyncPopulateUserAndThread()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(receiveThreadActionCreator(fakeThreadsResponse));
        expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action and call alert correctly when data fetching failed", async () => {
        // arrange
        api.getAllUsers = () => Promise.reject(fakeErrorResponse);
        api.getAllThread = () => Promise.reject(fakeErrorResponse);

        const dispatch = vi.fn();
        window.alert = vi.fn();

        await asyncPopulateUserAndThread()(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading())
        expect(dispatch).toHaveBeenCalledWith(hideLoading())
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
});
