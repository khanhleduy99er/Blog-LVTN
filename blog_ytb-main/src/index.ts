import cors from "cors";
import { config } from "dotenv";
import express from "express";
import routerGroupPost from "./api/routes/group-post-routes";
import routerPost from "./api/routes/post.routes";
import routerProduct from "./api/routes/product.routes";
import routerReviewUs from "./api/routes/review-us.routes";
import routerUser from "./api/routes/user.routes";
import authencationUser from "./api/routes/authencation.routes";
import routeImage from "./api/routes/image";

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use('/images', express.static('images'));       
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
config();
app.use("/api/post", routerPost);
app.use("/api/group-post", routerGroupPost);
app.use("/api/product", routerProduct);
app.use("/api/review-us", routerReviewUs);
app.use("/api/user", routerUser);
app.use("/api/user", routerUser);
app.use("/api/login", authencationUser);
app.use("/api/image", routeImage);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
