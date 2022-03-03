const db = require("../db");
const asyncWrapper = require("../middleware/async");
const AppError = require("../errors/appError");

// GET
const findMany = asyncWrapper(async (req, res, next) => {
  const users = await db.query("SELECT * FROM users");

  res
    .status(200)
    .json({ status: "success", results: users.rowCount, users: users.rows });
});

// POST
const createUser = asyncWrapper(async (req, res, next) => {
  const user = await db.query(
    "INSERT INTO users (avatar, name, bio, phone, email, password) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [
      req.body.avatar,
      req.body.name,
      req.body.bio,
      req.body.phone,
      req.body.email,
      req.body.password,
    ]
  );

  res.status(200).json({ status: "success", user: user.rows[0] });
});

// GET
const findUnique = asyncWrapper(async (req, res, next) => {
  const user = await db.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);

  if (user.rows.length === 0) {
    return next(
      new AppError(`Could not find user with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ status: "success", user: user.rows[0] });
});

// PUT
const updateUser = asyncWrapper(async (req, res, next) => {
  const user = await db.query(
    `
    UPDATE users
    SET avatar = $1,
      fname = $2,
      bio = $3,
      phone = $4,
      email = $5,
      password = $6
    WHERE id = $7;
    `,
    [
      req.body.avatar,
      req.body.fname,
      req.body.bio,
      req.body.phone,
      req.body.email,
      req.body.password,
      req.params.id,
    ]
  );

  if (user.rowCount === 0) {
    return next(
      new AppError(`Could not find user with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ status: "success" });
});

// DELETE
const deleteUser = asyncWrapper(async (req, res, next) => {
  const user = await db.query("DELETE FROM users WHERE id = $1;", [
    req.params.id,
  ]);

  if (user.rowCount === 0) {
    return next(
      new AppError(`Could not find user with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ status: "success", user: null });
});

module.exports = {
  findMany,
  createUser,
  findUnique,
  updateUser,
  deleteUser,
};
