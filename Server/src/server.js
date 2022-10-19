import express from "express";
import view from "./configs/ViewEngine";
import dotenv from "dotenv";
import initWebRoute from "./route/web";
import initapi from "./route/api";
import checkConnect from "./configs/ConnectDB";
// var morgan = require('morgan')
// import connection from "./configs/ConnectDB";

//--------------change---------------//
// import AuthRouter from "./route/AuthRoute.js";
import RoleRouter from "./route/RoleRoute.js";
//--------------change---------------//

const app = express();
dotenv.config();

// app.use(morgan(`combined`))
const port = process.env.PORT;
//Cau hinh request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

view(app);

initWebRoute(app);

initapi(app);

//--------------change---------------//
// AuthRouter(app);
RoleRouter(app);
//--------------change---------------//

checkConnect();
//bat loi trang
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
