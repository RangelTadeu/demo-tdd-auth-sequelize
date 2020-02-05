const { User } = require("../models");

class UserController {
  async index(req, res) {
    const users = User.findAll();

    return res.status(200).json(users);
  }

  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists." });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && user.email == email) {
      return res
        .status(400)
        .json({ message: "Email already exist on database" });
    }

    if (oldPassword && !(await user.checkPasswordHash(oldPassword))) {
      return res.status(401).json({ message: "Passwords does not match" });
    }

    const { id, name } = await user.update(req.body);

    return res.status(200).json({ id, name });
  }
}

module.exports = new UserController();
