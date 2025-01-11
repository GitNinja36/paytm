const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const cors = require("cors");

app.use(cors);

app.use("/api/vi", mainRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`port is working on ${port}`)
})
