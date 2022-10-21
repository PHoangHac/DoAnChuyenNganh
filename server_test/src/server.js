import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web.js";
import connecDB from "./config/connecDB";
import cors from "cors";
// import path from "path";
require("dotenv").config();
//---------GET ROUTE-----------//
import AuthRoutes from "./routes/authRoute.js";
//---------GET ROUTE-----------//

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//----------USE ROUTE---------//
AuthRoutes(app);
//----------USE ROUTE---------//

viewEngine(app);
initWebRoutes(app);

connecDB();

let port = process.env.PORT;

// static images folder
// app.use("/images", express.static("src/assets/images"));
// app.use("/congkhai", express.static(path.join(__dirname, "/public")));
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/public"));
// app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use("*/images", express.static("src/assets/images"));
// app.use("*/public", express.static("public"));
app.listen(port, "192.168.1.13", () => {
  console.log("server running");
});

// 192.168.1.13
