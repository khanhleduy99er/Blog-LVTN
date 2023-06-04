import {
  CreateUser,
  DeleteUser,
  GetUsers,
  Login,
  UpdateUser,
} from "../controller/user.controller";
import { routeMiddleware } from "./route-base";

const router = routeMiddleware();
router.get("/", GetUsers);
router.post("/", CreateUser);
router.put("/", UpdateUser);
router.delete("/", DeleteUser);
export default router;
