import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
import csrf from "csurf";
require("dotenv").config();

const app = express();
const csrfProtection = csrf({ cookie: true });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(csrfProtection);

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.get("/api/get-csrf-token", (req, res) => {
  return res.json({ csrfToken: req.csrfToken() });
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
