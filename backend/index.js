const express = require("express");
const cors = require("cors");

const app = express();
const mainRouter = require("./routes/index");

app.use(cors);
app.use(express.json())

app.use("/api/vi", mainRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`port is working on ${port}`)
})
