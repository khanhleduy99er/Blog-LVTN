import { Request, Response } from "express";
import { expressjwt } from "express-jwt";
import { promisify } from "util";

export { jwtMiddleware };

async function jwtMiddleware(req: Request, res: Response) {
  const middleware = expressjwt({
    secret: process.env.SECRETCONFIG ?? "",
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: "/api/post", method: "GET" },
      { url: "/api/group-post", method: "GET" },
      { url: "/api/product", method: "GET" },
      { url: "/api/review-us", method: "GET" },
      { url: "/api/login", method: "POST" },
      { url: "/api/user", method: "POST" },
    ],
  });

  return await promisify(middleware)(req, res);
}
