const express = require("express");

const {
  findMany,
  createUser,
  findUnique,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// http://localhost:6000/api/v1/users
router.route("/").get(findMany).post(createUser);

// http://localhost:6000/api/v1/users/76838
router.route("/:id").get(findUnique).put(updateUser).delete(deleteUser);

module.exports = router;
