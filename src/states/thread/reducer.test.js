/**
 * test scenario for threadReducer
 *
 * - threadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the thread with the new talk when given by ADD_THREAD action
 *  - should return the thread with the toggled like talk when given by TOGGLE_UPVOTE_THREAD action
 *  - should return the threads with the toggled like talk when given by TOGGLE_DOWNVOTE_THREAD action
 *
 */

import { describe, expect, it } from "vitest";
import threadsReducer from "./reducer";

describe("threadReducers function", () => {
    it("should return the initial state when given by unknown action", () => {
        // arrange
        const initialState = [];
        const action = { type: "UNKNOWN" };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it("should return the threads when given by RECEIVE_THREADS action", () => {
        // arrange
        const initialState = [];
        const action = {
            type: "RECEIVE_THREADS",
            payload: {
                threads: [
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
                    {
                        id: "thread-2",
                        title: "Thread Kedua",
                        body: "Ini adalah thread kedua",
                        category: "General",
                        createdAt: "2021-06-21T07:00:00.000Z",
                        ownerId: "users-2",
                        upVotesBy: [],
                        downVotesBy: [],
                        totalComments: 0,
                    },
                ],
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.threads);
    });

    it("should return the thread with the new talk when given by ADD_THREAD action", () => {
        const initialState = [
            {
                id: "thread-1",
                title: "Thread Kedua",
                body: "Ini adalah thread kedua",
                category: "General",
                createdAt: "2021-09-21T07:00:00.000Z",
                ownerId: "users-1",
                upVotesBy: [],
                downVotesBy: [],
                totalComments: 0,
            },
        ];
        const action = {
            type: "ADD_THREADS",
            payload: {
                threads: {
                    id: "thread-1",
                    title: "Thread Pertama",
                    body: "Ini adalah thread Pertama",
                    category: "General",
                    createdAt: "2021-06-21T07:00:00.000Z",
                    ownerId: "users-1",
                    upVotesBy: [],
                    downVotesBy: [],
                    totalComments: 0,
                },
            },
        };

        // action
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([action.payload.threads, ...initialState]);
    });

    it("should return the thread with the toggled like talk when given by TOGGLE_UPVOTE_THREAD action", () => {
        const initialState = [
            {
                id: "thread-1",
                title: "Thread Kedua",
                body: "Ini adalah thread kedua",
                category: "General",
                createdAt: "2021-09-21T07:00:00.000Z",
                ownerId: "users-1",
                upVotesBy: [],
                downVotesBy: [],
                totalComments: 0,
            },
        ];
        const action = {
            type: "TOGGLE_UPVOTE_THREAD",
            payload: {
                id: "vote-1",
                userId: "users-1",
                threadId: "thread-1",
                voteType: 1,
            },
        };

        // action: like thread
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([{
            ...initialState[0],
            upVotesBy: [action.payload.userId]
        }]);
    });

    it("should return the thread with the toggled like talk when given by TOGGLE_DOWNVOTE_THREAD action", () => {
        const initialState = [
            {
                id: "thread-1",
                title: "Thread Kedua",
                body: "Ini adalah thread kedua",
                category: "General",
                createdAt: "2021-09-21T07:00:00.000Z",
                ownerId: "users-1",
                upVotesBy: [],
                downVotesBy: [],
                totalComments: 0,
            },
        ];
        const action = {
            type: "TOGGLE_DOWNVOTE_THREAD",
            payload: {
                id: "vote-1",
                userId: "users-1",
                threadId: "thread-1",
                voteType: 1,
            },
        };

        // action: like thread
        const nextState = threadsReducer(initialState, action);

        // assert
        expect(nextState).toEqual([{
            ...initialState[0],
            downVotesBy: [action.payload.userId]
        }]);
    });
});
