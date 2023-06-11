import { Router } from "express";
import { GetGroupPosts } from "../controller/group-post.controller";

const router = Router();
router.get("/", GetGroupPosts);

export default router;
