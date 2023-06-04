import {
  CreatePost,
  DeletePost,
  GetPosts,
  UpdatePost,
} from "../controller/post.controller";
import { routeMiddleware } from "./route-base";

const router = routeMiddleware();
router.get("/", GetPosts);
router.post("/", CreatePost);
router.put("/", UpdatePost);
router.delete("/", DeletePost);
export default router;
