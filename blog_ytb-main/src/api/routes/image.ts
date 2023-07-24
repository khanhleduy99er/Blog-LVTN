import { GetImages } from "../controller/image";
import { routeMiddleware } from "./route-base";

const router = routeMiddleware();
router.get("/", GetImages);
export default router;
