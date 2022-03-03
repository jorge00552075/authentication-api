const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
