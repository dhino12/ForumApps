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
import {
    cleanup,
    render,
    screen,
    queryByAttribute,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import Modal from "./Modal";

expect.extend(matchers);

describe("LoginInput Component", () => {
    afterEach(() => {
        cleanup();
    });

    it("should handle title and body typing correctly", async () => {
        // Arrange
        const dom = render(
          <Modal
            setOpenModal={() => {}}
            addThread={() => {}}
            authUser={() => {}}
          />,
        );

        const getById = queryByAttribute.bind(null, "id");
        const titleThread = getById(dom.container, "title");
        const bodyThread = getById(dom.container, "body");

        // Action
        await userEvent.type(titleThread, "Hari bersejarah");
        await userEvent.type(bodyThread, "Hari Kesaktian Pancasila");

        // Assert
        expect(titleThread).toHaveValue("Hari bersejarah");
        expect(bodyThread.value.length <= 320).toBeTruthy();
    });

    it("should call addThread function when 'simpan' button is clicked", async () => {
        // Arrange
        const mockLogin = vi.fn();
        const dom = render(
          <Modal
            setOpenModal={() => {}}
            addThread={mockLogin}
            authUser={() => {}}
          />,
        );

        const getById = queryByAttribute.bind(null, "id");

        const titleThread = getById(dom.container, "title");
        await userEvent.type(titleThread, "Hari bersejarah");

        const bodyThread = getById(dom.container, "body");
        await userEvent.type(bodyThread, "Hari Kesaktian Pancasila");

        const loginButton = await screen.getByRole("button", {
            name: "Simpan",
        });

        // Action
        await userEvent.click(loginButton);

        // Assert
        expect(mockLogin).toBeCalledWith(
            "Hari bersejarah",
            "Hari Kesaktian Pancasila",
            "",
        );
    });
});
