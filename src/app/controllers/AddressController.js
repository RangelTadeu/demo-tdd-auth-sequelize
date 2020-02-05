const { User, Address } = require("../models");

class AddressController {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Address,
          as: "addresses"
        }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  }

  async store(req, res) {
    const { user_id } = req.params;
    const { country, street, number, zip_code } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ message: "User not fount" });
    }

    const addresses = await Address.create({
      country,
      zip_code,
      street,
      number,
      user_id
    });

    return res.status(200).json(addresses);
  }
}

module.exports = new AddressController();
