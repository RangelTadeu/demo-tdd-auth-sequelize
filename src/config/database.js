require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

module.exports = {
  storage: "./__tests__/database.sqlite",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscoredAll: true,
    underscored: true
    //freezeTableName: true
  }
};
