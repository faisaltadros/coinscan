const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const walletRoutes = require("./routes/wallets");

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/wallets", walletRoutes);
app.listen(port, function() {
  console.log("Runnning on " + port);
});

module.exports = app;
