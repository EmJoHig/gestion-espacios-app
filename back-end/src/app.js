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
import ministerioRoutes from "./routes/ministerio.routes.js";
import rolRoutes from "./routes/rol.routes.js";
import recursoRoutes from "./routes/recurso.routes.js";
import actividadRoutes from "./routes/actividad.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";
import solicitudRoutes from "./routes/solicitud.routes.js";
import espacioRoutes from "./routes/espacio.routes.js";
import estadoRoutes from "./routes/estado.routes.js";

import "./config/passport.js";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
//AUTH0
import { auth } from "express-oauth2-jwt-bearer";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const corsOptions = {
  origin: 'http://localhost:5173' || 'https://ge.patriciorodriguez.com.ar/',
  credentials: true, // Habilitar el intercambio de cookies y otros datos de autenticación
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Authorization, Origin, X-Requested-With, Content-Type, Accept",
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use((req, res, next) => {
  //console.log(`Request: ${req.method} ${req.url}`);
  //console.log(`Headers:`, req.headers);
  next();
});

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
app.use("/usuarios", usuarioRoutes);
app.use("/ministerio", ministerioRoutes);
app.use("/rol", rolRoutes);
app.use("/estado", estadoRoutes);
app.use("/recurso", recursoRoutes);
app.use("/actividad", actividadRoutes);
app.use("/espacio", espacioRoutes);
app.use("/reserva", reservaRoutes);
app.use("/solicitud", solicitudRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

export default app;
