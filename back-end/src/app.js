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
import espacioRoutes from "./routes/espacio.routes.js";

import "./config/passport.js";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";
//AUTH0
import { auth } from "express-oauth2-jwt-bearer";

// Initializations
// var upload = multer();
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'D88REM5wu7odEcAJ72Nk5XgxF1bOcJ80ZP3PyoEeZjKOBaXI9gPIYqlO1R9vumkm',
//   baseURL: 'http://localhost:3000',
//   clientID: 'mkKOcT1cFlYveX1fij08DUpqu18obztN',
//   issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// fin middleware auth0

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Habilitar el intercambio de cookies y otros datos de autenticación
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Authorization, Origin, X-Requested-With, Content-Type, Accept",
};
app.use(cors(corsOptions));

// const jwtCheck = auth({
//   audience: 'https://gestion-espacios/api',
//   issuerBaseURL: 'https://dev-zgzo7qc6w6kujif0.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });

// enforce on all endpoints
// app.use(jwtCheck);

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
app.use("/usuarios", usuarioRoutes);
app.use("/ministerio", ministerioRoutes);
app.use("/rol", rolRoutes);
app.use("/recurso", recursoRoutes);
app.use("/actividad", actividadRoutes);
app.use("/espacio", espacioRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

export default app;
