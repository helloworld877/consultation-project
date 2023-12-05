const express = require("express");
const port = 8080;
var app = express();
app.use(express.json);
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
app.use("/users", userRoutes);
app.use("/matches", matchRoutes);
app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.listen(port, function () {
  console.log("Started application on port %d", 8080);
});
