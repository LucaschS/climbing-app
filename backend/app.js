const bodyParser = require("body-parser");
const express = require("express");

const gymsRoutes = require("./routes/gyms");
const cavesRoutes = require("./routes/caves");
const routesRoutes = require("./routes/routes");

const authRoutes = require("./routes/auth");
const countiesRoutes = require("./routes/countries");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRoutes);

app.use("/gyms", gymsRoutes);

app.use("/caves", cavesRoutes);

app.use("/routes", routesRoutes);

app.use("/countries", countiesRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(8070);
