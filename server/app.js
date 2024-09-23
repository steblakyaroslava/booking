const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const config = require("config");
const ticketsRouter = require("./routes/tickets.routes");
const authRouter = require("./routes/auth.routes");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(ticketsRouter);
app.use(authRouter);

const db_url =
  config.get("DB_TYPE") === "local"
    ? `mongodb://${config.get("DB_USERNAME")}:${config.get(
        "DB_PASSWORD"
      )}@${config.get("DB_HOST")}:${config.get("DB_PORT")}/${config.get(
        "DB_NAME"
      )}`
    : `mongodb+srv://${config.get("DB_USERNAME")}:${config.get(
        "DB_PASSWORD"
      )}@${config.get("DB_CLUSTER")}.${config.get(
        "DB_HASH"
      )}.mongodb.net/${config.get("DB_NAME")}?retryWrites=true&w=majority`;

app.listen(PORT, () => {
  mongoose
    .connect(db_url)
    .then(() => console.log("Connected to db"))
    .catch((err) => console.error("Database connection error:", err));

  console.log(`Server running: http://localhost:${PORT}`);
});
