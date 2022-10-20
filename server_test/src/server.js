import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connecDB from "./config/connecDB";
import cors from "cors";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

viewEngine(app);
initWebRoutes(app);

connecDB();

let port = process.env.PORT;

app.listen(port, "192.168.1.13", () => {
  console.log("server running");
});
