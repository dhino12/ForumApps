/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the user when given by SET_AUTH_USER action
 *  - should return the user when given by UNSET_AUTH_USER action
 *  - should return the user when given by RECEIVE_USER action
 *
 */

import { describe, expect, it } from "vitest";
import authUserReducer from "./reducer";

describe("authUserReducer function", () => {
    it("should return the initial state when given by unknown action", () => {
        // arrange
        const initialState = [];
        const action = { type: "UNKNOWN" };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(initialState);
    });

    it("should return the user when given by SET_AUTH_USER action", () => {
        // arrange
        const initialState = [
            {
                email: "dhinorahmad0@gmail.com",
                password: "uciha 123",
            },
        ];
        const action = {
            type: "SET_AUTH_USER",
            payload: {
                authUser: {
                    id: "john_doe",
                    name: "John Doe",
                    email: "john@example.com",
                    avatar: "https://generated-image-url.jpg",
                },
            },
        };

        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.authUser);
    });

    it("should return the user when given by UNSET_AUTH_USER action", () => {
        // arrange
        const initialState = [];
        const action = {
            type: "UNSET_AUTH_USER",
            payload: {
                authUser: null,
            },
        };
        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.authUser);
    });

    it("should return the user when given by RECEIVE_USER action", () => {
        // arrange
        const initialState = [
            {
                id: "john_doe",
                name: "John Doe",
                email: "john@example.com",
                avatar: "https://generated-image-url.jpg",
            },
        ];
        const action = {
            type: "RECEIVE_USER",
            payload: {
                users: [
                    {
                        id: "john_doe",
                        name: "John Doe",
                        email: "john@example.com",
                        avatar: "https://generated-image-url.jpg",
                    },
                    {
                        id: "jane_doe",
                        name: "Jane Doe",
                        email: "jane@example.com",
                        avatar: "https://generated-image-url.jpg",
                    },
                ],
            },
        };
        // action
        const nextState = authUserReducer(initialState, action);

        // assert
        expect(nextState).toEqual(action.payload.authUser);
    });
});
