require("dotenv").config();
const { config } = require("process");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const hostname = "localhost";
const appRouter = require("./src/routes/routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/pokemons", appRouter);

app.listen(port, hostname, () => {
  console.log(">>> running on port", port);
});
