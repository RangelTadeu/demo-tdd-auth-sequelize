const routes = require("express").Router();

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const AddressesController = require("./app/controllers/AddressController");
const authenticationMiddleware = require("./app/middlewares/authentication");

routes.post("/sessions", SessionController.store);

routes.post("/users", UserController.store);

routes.use(authenticationMiddleware); //middleware exige autenticação das rotas abaixo

routes.put("/users", UserController.update);
routes.get("/users", UserController.index);

routes.get("/users/:user_id/addresses", AddressesController.index);
routes.post("/users/:user_id/addresses", AddressesController.store);

//rota privada para testes
routes.get("/private", (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
