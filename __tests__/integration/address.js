const { User } = require("../../src/app/models");
const request = require("supertest");
const app = require("../../src/app");
const clean = require("../utils/clean");

module.exports = () => {
  describe("Addresses", () => {
    beforeEach(async () => {
      await clean();
    });

    it("Should not access address of an inexists user", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .get(`/users/0/addresses`)
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(400);
    });

    it("Should list addresses of an user", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .get(`/users/${user.id}/addresses`)
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });

    it("Should not create an address to an inexistent user", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .post(`/users/0/addresses`)
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(400);
    });

    it("Should create an address to an user", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .post(`/users/${user.id}/addresses`)
        .send({
          country: "Brazil",
          zip_code: "00.000-000",
          street: "Rua",
          number: "0"
        })
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });
  });
};
