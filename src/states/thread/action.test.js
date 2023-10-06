/**
 * skenario test
 *
 * - asyncAddThread thunk
 *  - should correctly send an action when the data addition is successful
 *  - should correctly send an action when the data addition is failed
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

const fakeThreadRequest = {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread Pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
};

const fakeErrorResponse = new Error("Ups, something went wrong");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import api from "../../utils/api";
import { addThreadActionCreator, asyncAddThread } from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";

describe("asyncAddThread thunk", async () => {
    beforeEach(() => {
        api._createThread = api.createThread;
        // setup the simplest document possible
    });

    afterEach(() => {
        api._createThread = api.createThread;

        // delete backup data
        delete api._createThread;
    });

    it("should correctly send an action when the data addition is successful", async () => {
        // arrange
        // stub implementation
        api.createThread = () => Promise.resolve(fakeThreadsResponse);

        // mock
        const dispatch = vi.fn();

        // action
        await asyncAddThread(fakeThreadRequest)(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadsResponse));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly send an action when the data addition is failed", async () => {
        // arrange
        // stub implementation
        api.createThread = () => Promise.reject(fakeErrorResponse);

        const dispatch = vi.fn();
        window.alert = vi.fn();

        // action
        await asyncAddThread(fakeThreadRequest)(dispatch);

        // assert
        expect(dispatch).toHaveBeenCalledWith(showLoading())
        expect(dispatch).toHaveBeenCalledWith(hideLoading())
        expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    })
});
