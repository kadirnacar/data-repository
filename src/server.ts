import * as bodyParser from "body-parser";
import * as express from "express";
import * as xmlparser from "express-xml-bodyparser";
import { createConnection } from "typeorm";
import corsPrefetch from './cors';
import { User } from "./models/User";
import { DemoRouter } from "./routes/demo";

class App {
  public express;

  constructor() {
    this.express = express();
    this.middleware();
    this.database();
    this.routes();
  }

  private database(): void {

    createConnection({
      "host": "localhost",
      "username": "root",
      "password": "123",
      "database": "northwind",
      "type": "mysql",
      synchronize: true,
      entities: [User.schema()]
    }).then(async connection => {
      console.log("Connected to DB");
    }).catch(error => console.log("TypeORM connection error: ", error));
  }

  private middleware(): void {
    this.express.use(corsPrefetch);
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(xmlparser());
  }

  private routes(): void {
    let router = express.Router();
    this.express.use(express.static("public"));
    this.express.use(express.static("dist"));
    this.express.use(express.static("."));
    this.express.use(express.static("js"));
    this.express.use(/\/((?!api).)*/, function (req, res) {
      res.send('App Server');
    })

    this.express.use("/", router);
    this.express.use("/api/demo", new DemoRouter().router);

    this.express.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        message: err.message || err,
        error: err
      });
    })
  }
}

export default new App().express;
