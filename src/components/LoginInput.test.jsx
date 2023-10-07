/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import {
 describe, it, expect, afterEach, vi,
} from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from '@testing-library/jest-dom/matchers';
import { BrowserRouter } from "react-router-dom";
import LoginInput from "./LoginInput";

expect.extend(matchers);

describe("LoginInput Component", () => {
    afterEach(() => {
        cleanup();
    });

    it("should handle email typing correctly", async () => {
        // Arrange
        render(
          <BrowserRouter>
            <LoginInput login={() => {}} />
          </BrowserRouter>,
        );
        const usernameInput = await screen.getByPlaceholderText("masukan email");

        // Action
        await userEvent.type(usernameInput, "usernametest");

        // Assert
        expect(usernameInput).toHaveValue("usernametest");
    });

    it("should handle password typing correctly", async () => {
        // Arrange
        render(
          <BrowserRouter>
            <LoginInput login={() => {}} />
          </BrowserRouter>,
        );
        const usernameInput = await screen.getByPlaceholderText("masukan password");

        // Action
        await userEvent.type(usernameInput, "usernametest");

        // assert
        expect(usernameInput).toHaveValue("usernametest");
    });

    it("should call login function when login button is clicked", async () => {
        // Arrange
        const mockLogin = vi.fn();
        render(
          <BrowserRouter>
            <LoginInput login={mockLogin} />
          </BrowserRouter>,
        );

        const usernameInput = await screen.getByPlaceholderText("masukan email");
        await userEvent.type(usernameInput, "emailtest");

        const passwordInput = await screen.getByPlaceholderText("masukan password");
        await userEvent.type(passwordInput, "passwordtest");

        const loginButton = await screen.getByRole("button", { name: "Login" });

        // Action
        await userEvent.click(loginButton);

        // Assert
        expect(mockLogin).toBeCalledWith({
            emailUser: "emailtest",
            passwordUser: "passwordtest",
        });
    });
});
