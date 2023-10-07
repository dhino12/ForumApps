/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe("Login spec", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.get("a")
          .contains(/^Login$/)
          .click();
    });

    it("should display login page correctly", () => {
        cy.get("input[placeholder='masukan email']").should("be.visible");
        cy.get("input[placeholder='masukan password']").should("be.visible");
        cy.get("button")
            .contains(/^Login$/)
            .should("be.visible");
    });

    it("should display alert when email is empty", () => {
        // klik tombol login tanpa mengisi email
        cy.get("button")
            .contains(/^Login$/)
            .click();

        // memverifikasi window.alert untuk menampilkan pesan dari API
        cy.on("window:alert", (str) => {
            expect(str).to.equal('"id" is not allowed to be empty');
        });
    });

    it("should display alert when password is empty", () => {
      // mengisi email
      cy.get('input[placeholder="masukan email"]').type("dhinorahmad0@gmail.com");

      // klik tombol login tanpa mengisi password
      cy.get("button")
          .contains(/^Login$/)
          .click();

      // memverifikasi window.alert untuk menampilkan pesan dari API
      cy.on("window:alert", (str) => {
          expect(str).to.equal('"password" is not allowed to be empty');
      });
    });

    it("should display alert when email and password are wrong", () => {
      // mengisi email
      cy.get('input[placeholder="masukan email"]').type("dhinorahmad0@gmail.com");

      // mengisi password yang salah
      cy.get('input[placeholder="masukan password"]').type("wrong_password");

      // menekan tombol Login
      cy.get("button")
          .contains(/^Login$/)
          .click();

      // memverifikasi window.alert untuk menampilkan pesan dari API
      cy.on("window:alert", (str) => {
          expect(str).to.equal("User ID or password is wrong");
      });
  });

  it("should display homepage when email and password are correct", () => {
      // mengisi email
      cy.get('input[placeholder="masukan email"]').type("dhinorahmad0@gmail.com");

      // mengisi password
      cy.get('input[placeholder="masukan password"]').type("uciha 123");

      // menekan tombol Login
      cy.get("button")
          .contains(/^Login$/)
          .click();

      // memverifikasi bahwa elemen yang berada di homepage ditampilkan
      cy.get("nav")
          .contains(/^Home$/)
          .should("be.visible");
      cy.get("button").contains("Logout").should("be.visible");
  });
});
