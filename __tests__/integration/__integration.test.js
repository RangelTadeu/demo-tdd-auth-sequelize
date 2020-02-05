const session = require("./session");
const user = require("./user");
const address = require("./address");

describe("sequentially run tests", () => {
  session();
  user();
  address();
});
