const { User } = require("../../src/app/models");
const request = require("supertest");
const app = require("../../src/app");
const clean = require("../utils/clean");

module.exports = () => {
  describe("Auth", () => {
    beforeEach(async () => {
      await clean();
    });

    it("should return a jtw on login", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .post("/sessions")
        .send({
          email: user.email,
          password: "123"
        });

      expect(response.body).toHaveProperty("token");
    });

    it("should not auth with an incorrect email", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .post("/sessions")
        .send({
          email: "rangel@tadeu.com", //wrong email
          password: "123"
        });

      expect(response.status).toBe(401);
    });

    it("should not auth with an incorrect password", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .post("/sessions")
        .send({
          email: user.email,
          password: "321" //wrong password
        });

      expect(response.status).toBe(401);
    });

    it("should access private routes with a valid token", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .get("/private")
        .set("Authorization", `Bearer ${user.generateToken()}`);

      expect(response.status).toBe(200);
    });

    it("should not access private routes with an invalid token", async () => {
      const user = await User.create({
        name: "tadeu",
        email: "tadeu@rangel.com",
        password: "123"
      });

      const response = await request(app)
        .get("/private")
        .set("Authorization", "Bearer 123");

      expect(response.status).toBe(401); //401
    });

    it("should not access private routes without a valid token", async () => {
      const response = await request(app).get("/private");

      expect(response.status).toBe(401); //401
    });
  });
};
