const { User } = require("../../src/app/models");
const request = require("supertest");
const app = require("../../src/app");
const clean = require("../utils/clean");

module.exports = () => {
  describe("Users", () => {
    beforeEach(async () => {
      await clean();
    });

    it("Should not update user when an email already exists on database", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .put("/users")
        .send({
          email: "tadeu@rangel.com",
          oldPassword: "123"
        })
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(400);
    });

    it("Should not update password with an incorrect old password", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .put("/users")
        .send({
          oldPassword: "123345",
          password: "1234"
        })
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(401);
    });

    it("Should update user infos", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .put("/users")
        .send({
          email: "rangel@tadeu.com",
          oldPassword: "123",
          password: "123456"
        })
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });

    it("Should not create an user with a duplicate email", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .post("/users")
        .send({
          name: "tadeu",
          email: "tadeu@rangel.com",
          password: "123"
        });

      expect(response.status).toBe(400);
    });

    it("Should create an user", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "tadeu",
          email: "tadeu@rangel.com",
          password: "123"
        });

      expect(response.status).toBe(200);
    });

    it("Should list all users", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });
  });
};
