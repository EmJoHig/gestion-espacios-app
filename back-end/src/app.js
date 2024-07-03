import express from "express";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { MONGODB_URI, PORT } from "./config.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import "./config/passport.js";
import bodyParser from "body-parser";
import multer from "multer";


// Initializations
// var upload = multer();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


// middlewares
app.use(
  bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    // store: MongoStore.create({ mongoUrl: MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// for parsing multipart/form-data
// app.use(upload.array());
// app.use(bodyParser.json());
// settings
// app.set("port", PORT);
// app.set("views", join(__dirname, "views"));

// config view engine
// app.use(morgan("dev"));
// app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }));


// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
// app.use(usuarioRoutes);
app.use("/usuarios",usuarioRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

export default app;
