const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const AppError = require("./errors/appError");
const errorHandlerMiddleware = require("./middleware/error-handler");
//////////////////////////////
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
require("dotenv").config();

// routes
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorHandlerMiddleware);

// server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
