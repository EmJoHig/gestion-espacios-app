// import { Router } from "express";
import pkg from 'express';
const { Router } = pkg;
import { renderIndex, renderAbout } from "../controllers/index.controller.js";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);

export default router;
