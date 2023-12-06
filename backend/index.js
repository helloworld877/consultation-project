const express = require("express");
const port = 8080;
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://mmghaly3:EO0TUxRL6RRwEwsw@users.iaf0wje.mongodb.net/")
  .then((result) =>
    app.listen(port, (req, res, next) => {
      console.log("Server running on port 5000");
    })
  )
  .catch((err) => console.log(err));
const app = express();
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
