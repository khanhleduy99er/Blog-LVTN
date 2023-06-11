import { Router } from "express";
import { Login } from "../controller/user.controller";

const router = Router();
router.post("/", Login);
export default router;
