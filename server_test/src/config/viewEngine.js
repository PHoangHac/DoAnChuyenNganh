import express from 'express';

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));//Cau hinh static : lay anh tren sever thi chi lay duoc o thu muc src/pulic 
    app.set("view engine", "ejs"); // dung viewengine cua thu vien ejs
    app.set("views", "./src/views");
}

module.exports = configViewEngine;