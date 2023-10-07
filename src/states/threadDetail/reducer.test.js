/**
 * test scenario for threadReducer
 *
 * - threadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the thread with the new talk when given by ADD_THREAD action
 *  - should return the thread with the toggled like talk when given by TOGGLE_UPVOTE_THREAD action
 *  - should return the threads with the toggled like talk
         when given by TOGGLE_DOWNVOTE_THREAD action
 *
 */

import { describe, expect, it } from "vitest";
import threadDetailReducer from "./reducer";

describe("threadDetailReducer function", () => {
    it("should return the initial state when given by unknown action", () => {
        // arrange
        const initialState = [];
        const action = { type: "UNKNOWN" };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it("should return the threadDetail when given by RECEIVE_THREAD_DETAIL action", () => {
        // arrange
        const initialState = [];
        const action = {
            type: "RECEIVE_THREAD_DETAIL",
            payload: {
                threadDetail: {
                    id: "thread-1",
                    title: "Thread Pertama",
                    body: "Ini adalah thread pertama",
                    category: "General",
                    createdAt: "2021-06-21T07:00:00.000Z",
                    owner: {
                        id: "users-1",
                        name: "John Doe",
                        avatar: "https://generated-image-url.jpg",
                    },
                    upVotesBy: [],
                    downVotesBy: [],
                    comments: [
                        {
                            id: "comment-1",
                            content: "Ini adalah komentar pertama",
                            createdAt: "2021-06-21T07:00:00.000Z",
                            owner: {
                                id: "users-1",
                                name: "John Doe",
                                avatar: "https://generated-image-url.jpg",
                            },
                            upVotesBy: [],
                            downVotesBy: [],
                        },
                    ],
                },
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.threadDetail);
    });

    it("should return the thread with the new thread when given by ADD_COMMENT action", () => {
        const initialState = {
            id: "thread-1",
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            owner: {
                id: "users-1",
                name: "John Doe",
                avatar: "https://generated-image-url.jpg",
            },
            upVotesBy: [],
            downVotesBy: [],
            comments: [
                {
                    id: "comment-1",
                    content: "Ini adalah komentar pertama",
                    createdAt: "2021-06-21T07:00:00.000Z",
                    owner: {
                        id: "users-1",
                        name: "John Doe",
                        avatar: "https://generated-image-url.jpg",
                    },
                    upVotesBy: [],
                    downVotesBy: [],
                },
            ],
        };
        const action = {
            type: "ADD_COMMENT",
            payload: {
                comment: {
                    id: "comment-2",
                    content: "Ini adalah komentar kedua",
                    createdAt: "2021-06-21T07:00:00.000Z",
                    owner: {
                        id: "users-1",
                        name: "John Doe",
                        avatar: "https://generated-image-url.jpg",
                    },
                    upVotesBy: [],
                    downVotesBy: [],
                },
            },
        };

        // action
        const nextState = threadDetailReducer(initialState, action);

        // assert
        expect(nextState).toEqual({
            ...initialState,
            comments: [action.payload.comment, ...initialState.comments],
        });
    });
});
